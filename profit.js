document.addEventListener('DOMContentLoaded', function () {
    const addCryptoButton = document.getElementById('addCrypto');
    const cryptosContainer = document.getElementById('cryptos');
    const calculateButton = document.getElementById('calculateProfits');
    const exportButton = document.getElementById('exportJson');
    const importButton = document.getElementById('importJson');
    const importTrigger = document.getElementById('importJsonTrigger');
    const resultsContainer = document.getElementById('results');
    let cryptoCount = 0;

    // Ajouter une nouvelle crypto
    addCryptoButton.addEventListener('click', function () {
        addCrypto();
    });

    // Exporter la configuration en JSON
    exportButton.addEventListener('click', function () {
        const cryptos = getCryptosFromForm();
        const jsonBlob = new Blob([JSON.stringify(cryptos, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(jsonBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'cryptos-config.json';
        link.click();

        URL.revokeObjectURL(url); // Libérer l'URL après téléchargement
    });

    // Importer une configuration JSON
    importTrigger.addEventListener('click', function () {
        importButton.click(); // Déclencher le fichier input caché
    });

    importButton.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const importedData = JSON.parse(e.target.result);
                loadCryptosFromJson(importedData);
            };
            reader.readAsText(file);
        }
    });

    // Calculer les profits
    calculateButton.addEventListener('click', function () {
        const cryptos = getCryptosFromForm();
        resultsContainer.innerHTML = ''; // Clear previous results

        cryptos.forEach(crypto => {
            const results = [];
            let totalProfit = 0;

            // Calcul des profits pour chaque palier
            crypto.price_per_tier.forEach((price, i) => {
                const percentage = crypto.percentage_per_tier[i] / 100;
                const tokensToSell = crypto.total_tokens * percentage;
                const profit = tokensToSell * price;
                totalProfit += profit;

                results.push({
                    palier: i + 1,
                    percentage_sold: crypto.percentage_per_tier[i],
                    tokens_sold: tokensToSell.toFixed(2),
                    price_per_token: price.toFixed(2),
                    profit: profit.toFixed(2),
                });
            });

            // Afficher les résultats pour cette crypto
            const cryptoSection = document.createElement('div');
            cryptoSection.innerHTML = `
                <h3>${crypto.name}</h3>
                <h4>Profit total : ${totalProfit.toFixed(2)} $</h4>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Palier</th>
                            <th>Pourcentage vendu</th>
                            <th>Tokens vendus</th>
                            <th>Prix par token</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td>${result.palier}</td>
                                <td>${result.percentage_sold} %</td>
                                <td>${result.tokens_sold}</td>
                                <td>${result.price_per_token} $</td>
                                <td>${result.profit} $</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            resultsContainer.appendChild(cryptoSection);
        });
    });

    // Ajouter une crypto (fonction réutilisable)
    function addCrypto(data = null) {
        cryptoCount++;
        const newCrypto = document.createElement('div');
        newCrypto.classList.add('crypto-section');
        newCrypto.innerHTML = `
            <h3>Crypto ${cryptoCount}</h3>
            <div class="mb-3">
                <label class="form-label">Nom de la Crypto</label>
                <input type="text" class="form-control crypto-name" placeholder="Exemple: BTC, ETH" value="${data?.name || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Total de Jetons</label>
                <input type="number" class="form-control crypto-total-tokens" placeholder="Exemple: 10" value="${data?.total_tokens || ''}">
            </div>
            <div class="paliers" id="paliers-${cryptoCount}"></div>
            <button type="button" class="btn btn-secondary addPalier" data-crypto="${cryptoCount}">Ajouter un Palier</button>
            <hr>
        `;
        cryptosContainer.appendChild(newCrypto);

        const paliersContainer = newCrypto.querySelector(`#paliers-${cryptoCount}`);
        const addPalierButton = newCrypto.querySelector('.addPalier');

        // Ajouter les paliers si présents dans les données
        if (data?.price_per_tier && data?.percentage_per_tier) {
            data.price_per_tier.forEach((price, i) => {
                addPalier(paliersContainer, price, data.percentage_per_tier[i]);
            });
        }

        // Gérer l'ajout de nouveaux paliers
        addPalierButton.addEventListener('click', function () {
            addPalier(paliersContainer);
        });
    }

    // Ajouter un palier
    function addPalier(container, price = '', percentage = '') {
        const newPalier = document.createElement('div');
        newPalier.classList.add('palier');
        newPalier.innerHTML = `
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Prix par token ($)</label>
                    <input type="number" class="form-control price-per-tier" placeholder="Exemple: 100000" value="${price}" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Pourcentage vendu (%)</label>
                    <input type="number" class="form-control percentage-per-tier" placeholder="Exemple: 10" value="${percentage}" required>
                </div>
            </div>
        `;
        container.appendChild(newPalier);
    }

    // Récupérer les cryptos depuis le formulaire
    function getCryptosFromForm() {
        const cryptos = [];
        const cryptoSections = document.querySelectorAll('.crypto-section');

        cryptoSections.forEach(section => {
            const name = section.querySelector('.crypto-name').value;
            const totalTokens = parseFloat(section.querySelector('.crypto-total-tokens').value);
            const priceInputs = section.querySelectorAll('.price-per-tier');
            const percentageInputs = section.querySelectorAll('.percentage-per-tier');

            const pricePerTier = Array.from(priceInputs).map(input => parseFloat(input.value) || 0);
            const percentagePerTier = Array.from(percentageInputs).map(input => parseFloat(input.value) || 0);

            cryptos.push({
                name,
                total_tokens: totalTokens,
                price_per_tier: pricePerTier,
                percentage_per_tier: percentagePerTier,
            });
        });

        return cryptos;
    }

    // Charger les cryptos depuis un JSON
    function loadCryptosFromJson(cryptos) {
        cryptosContainer.innerHTML = ''; // Clear existing cryptos
        cryptos.forEach(crypto => addCrypto(crypto));
    }
});
