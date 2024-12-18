// Sélecteurs
const widthInput = document.getElementById('plaque-width');
const heightInput = document.getElementById('plaque-height');
const toggleRatioBtn = document.getElementById('toggle-ratio');
const unitCheckbox = document.getElementById('unit-mm');
const coinsArrondisCheckbox = document.getElementById('coins-arrondis');
const coinsRadiusSlider = document.getElementById('coins-radius-slider');
const formeSelect = document.getElementById('forme-plaque');

// Variables internes
let keepRatio = true; // par défaut, ratio conservé
let useMm = true; // par défaut en mm

// Dimensions internes toujours en mm
let currentWidth = parseFloat(widthInput.value);   // mm
let currentHeight = parseFloat(heightInput.value); // mm

// Calcul du ratio initial (en mm)
let initialRatio = currentWidth / currentHeight;

// Conversion px/mm (ajustez le facteur)
const pxPerMm = 3;

// Fonction utilitaire pour mettre à jour l'affichage des inputs en fonction de l'unité actuelle
function updateInputsDisplay() {
    if (useMm) {
        // Afficher les valeurs en mm
        widthInput.value = currentWidth.toFixed(1);
        heightInput.value = currentHeight.toFixed(1);
    } else {
        // Afficher les valeurs en cm
        // 1 cm = 10 mm
        widthInput.value = (currentWidth / 10).toFixed(2);
        heightInput.value = (currentHeight / 10).toFixed(2);
    }
}

// Met à jour l'affichage de la plaque
function updatePlaqueDisplay() {
    // Convertir largeur/hauteur interne en px selon pxPerMm
    let widthPx = currentWidth * pxPerMm;
    let heightPx = currentHeight * pxPerMm;

    // Mettre à jour taille de la plaque
    plaqueContainer.style.width = widthPx + 'px';
    plaqueContainer.style.height = heightPx + 'px';

    // Gérer la forme
    let forme = formeSelect.value;
    switch(forme) {
        case 'rectangle':
            if (coinsArrondisCheckbox.checked) {
                let radiusPercent = coinsRadiusSlider.value;
                plaqueContainer.style.borderRadius = radiusPercent + '%';
            } else {
                plaqueContainer.style.borderRadius = '0';
            }
            plaqueContainer.style.clipPath = 'none';
            break;
        case 'cercle':
            plaqueContainer.style.borderRadius = '50%';
            plaqueContainer.style.clipPath = 'none';
            break;
        case 'ovale':
            let radiusOvale = coinsArrondisCheckbox.checked ? coinsRadiusSlider.value : 50;
            plaqueContainer.style.borderRadius = radiusOvale + '% / 50%';
            plaqueContainer.style.clipPath = 'none';
            break;
        case 'panneau':
            plaqueContainer.style.borderRadius = '0';
            plaqueContainer.style.clipPath = 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)';
            break;
        default:
            plaqueContainer.style.borderRadius = '0';
            plaqueContainer.style.clipPath = 'none';
    }

    const frameEl = elements.find(e=>e.type==='frame');
    if (frameEl) {
        const elem = frameEl.elementNode;
        elem.style.width = plaqueContainer.offsetWidth + 'px';
        elem.style.height = plaqueContainer.offsetHeight + 'px';
        elem.style.left = '0px';
        elem.style.top = '0px';
        elem.style.transform = 'none';
        // pointer-events none si on veut pas le sélectionner
        // ou sinon pointer-events:auto; si besoin
    }

    updateSurfaceDisplay();
}

// Met à jour le calcul de la surface
function updateSurfaceDisplay() {
    const thicknessSurfaceSection = document.querySelector('.thickness-surface-section');

    // Les dimensions internes sont en mm
    let widthInMm = currentWidth;
    let heightInMm = currentHeight;

    let surfaceMm2 = widthInMm * heightInMm; // surface en mm²
    let epaisseur = 3; // exemple statique
    let surfaceText = '';

    if (useMm) {
        surfaceText = surfaceMm2.toFixed(0) + ' mm²';
    } else {
        // En cm²
        let surfaceCm2 = surfaceMm2 / 100; // 1 cm² = 100 mm²
        surfaceText = surfaceCm2.toFixed(0) + ' cm²';
    }

    thicknessSurfaceSection.querySelector('.info-line:nth-child(1) strong').textContent = epaisseur + ' mm';
    thicknessSurfaceSection.querySelector('.info-line:nth-child(2) strong').textContent = surfaceText;
}

// Lorsque l'utilisateur modifie la largeur
widthInput.addEventListener('input', (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) return;

    // Convertir en mm si nécessaire
    if (!useMm) {
        val = val * 10; // val était en cm, on repasse en mm
    }

    currentWidth = val;

    if (keepRatio) {
        // Recalculer la hauteur en mm
        currentHeight = currentWidth / initialRatio;
    }

    updateInputsDisplay();
    updatePlaqueDisplay();
});

// Lorsque l'utilisateur modifie la hauteur
heightInput.addEventListener('input', (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) return;

    // Convertir en mm si nécessaire
    if (!useMm) {
        val = val * 10; // val en cm, converti en mm
    }

    currentHeight = val;

    if (keepRatio) {
        // Recalculer la largeur en mm
        currentWidth = currentHeight * initialRatio;
    }

    updateInputsDisplay();
    updatePlaqueDisplay();
});

// Toggle ratio
toggleRatioBtn.addEventListener('click', () => {
    keepRatio = !keepRatio;
    if (keepRatio) {
        toggleRatioBtn.classList.add('active');
        // recalculer le ratio sur la base actuelle (en mm)
        initialRatio = currentWidth / currentHeight;
    } else {
        toggleRatioBtn.classList.remove('active');
    }
});

// Changement d'unité mm/cm
unitCheckbox.addEventListener('change', (e) => {
    useMm = e.target.checked; // si coché => mm, sinon cm
    // Ne pas changer currentWidth/currentHeight !
    // Juste changer l'affichage.
    updateInputsDisplay();
    updatePlaqueDisplay();
});

// Coins arrondis toggle
coinsArrondisCheckbox.addEventListener('change', (e) => {
    const wrapper = document.querySelector('.coins-radius-wrapper');
    if (e.target.checked) {
        wrapper.style.display = 'flex';
    } else {
        wrapper.style.display = 'none';
    }
    updatePlaqueDisplay();
});

// Slider pour le rayon des coins
coinsRadiusSlider.addEventListener('input', () => {
    updatePlaqueDisplay();
});

// Changement de forme
formeSelect.addEventListener('change', () => {
    updatePlaqueDisplay();
});

// Initialisation
updateInputsDisplay();
updatePlaqueDisplay();
