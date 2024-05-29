function generateTeams(numPlayers, priority) {
    let players = Array.from({ length: numPlayers }, (_, i) => i + 1);
    players = shufflePlayers(players); // Mélange des joueurs
    const teams = [];
    let remainingPlayers = numPlayers;

    // Formation des équipes selon la priorité
    if (priority === 'doublette') {
        while (remainingPlayers >= 4) {
            if (remainingPlayers === 6) {
                // Si 6 joueurs restent et la priorité est doublette, former une triplette pour utiliser tous les joueurs
                teams.push(players.splice(0, 3));
                teams.push(players.splice(0, 3));
                break;
            } else {
                teams.push(players.splice(0, 2));
                remainingPlayers -= 2;
            }
        }
    } else { // Priorité aux triplettes
        while (remainingPlayers >= 6) {
            if (remainingPlayers % 6 !== 0 && remainingPlayers < 8) {
                teams.push(players.splice(0, 2));
                remainingPlayers -= 2;
            } else {
                teams.push(players.splice(0, 3));
                remainingPlayers -= 3;
            }
        }
    }

    return teams;
}

function generateTournament(numPlayers, priority) {
    let teams = generateTeams(numPlayers, priority);
    let matches = [];

    for (let round = 0; round < 4; round++) { // Générer 4 rounds
        teams = shuffleTeams(teams); // Mélanger les équipes pour diversifier les matchs
        let roundMatches = [];
        for (let i = 0; i < teams.length; i += 2) {
            if (teams[i + 1] && teams[i].length === teams[i + 1].length) {
                roundMatches.push([teams[i], teams[i + 1]]);
            }
        }
        matches.push(roundMatches);
    }

    return matches;
}

function shufflePlayers(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleTeams(teams) {
    let players = teams.flat(); // Aplatir les équipes en une liste unique de joueurs pour les remélanger
    return generateTeams(players.length, 'doublette'); // Regénérer les équipes après mélange
}

function displayTournament(matches) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '<h1>Tournoi de Pétanque Mêlée</h1>';

    matches.forEach((round, roundIndex) => {
        const roundElement = document.createElement('div');
        roundElement.innerHTML = `<h2>Partie ${roundIndex + 1}</h2>`;
        round.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.textContent = `${match[0].join('-')} vs ${match[1].join('-')}`;
            roundElement.appendChild(matchElement);
        });
        resultsElement.appendChild(roundElement);
    });
}

// Fonction principale pour démarrer le tournoi
function handleTournament() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const priority = document.getElementById('priority').value;
    const matches = generateTournament(numPlayers, priority);
    displayTournament(matches);
}
