function generateTeams(numPlayers, priority) {
    let players = Array.from({ length: numPlayers }, (_, i) => i + 1);
    players = shufflePlayers(players); // Mélange des joueurs
    const teams = [];
  
    if (priority === 'triplette') {
      // Déterminer le nombre initial de triplettes et de joueurs restants
      let numTriplettes = Math.floor(numPlayers / 3);
      let remainingPlayers = numPlayers - numTriplettes * 3;
  
      console.log(`Triplettes initiales : ${numTriplettes}, Joueurs restants : ${remainingPlayers}`);
  
      // Ajuster le nombre de triplettes pour que les joueurs restants soient divisibles par 4 (pour les doublettes)
      while (remainingPlayers % 4 !== 0) {
        numTriplettes--;
        remainingPlayers += 3;
      }
  
      console.log(`Triplettes ajustées : ${numTriplettes}, Joueurs pour doublettes : ${remainingPlayers}`);
  
      // Ajouter les triplettes aux équipes
      for (let i = 0; i < numTriplettes; i++) {
        teams.push({ type: 'Triplette', players: players.splice(0, 3) });
      }
  
      // Créer des doublettes avec les joueurs restants
      let numDoublettes = Math.floor(remainingPlayers / 4);
      for (let i = 0; i < numDoublettes; i++) {
        teams.push({ type: 'Doublette', players: players.splice(0, 2) });
      }
    } else {
      // Pas de priorité triplette, on ne fait que des doublettes
      let numDoublettes = Math.floor(numPlayers / 2);
      let remainingPlayers = numPlayers - numDoublettes * 2;
  
      console.log(`Doublettes initiales : ${numDoublettes}, Joueurs restants : ${remainingPlayers}`);
  
      // Ajuster le nombre de doublettes pour que tous les joueurs soient répartis
      while (remainingPlayers !== 0) {
        numDoublettes--;
        remainingPlayers = numPlayers - numDoublettes * 2;
      }
  
      console.log(`Doublettes ajustées : ${numDoublettes}`);
  
      // Ajouter les doublettes aux équipes
      for (let i = 0; i < numDoublettes; i++) {
        teams.push({ type: 'Doublette', players: players.splice(0, 2) });
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
        // Assurer un nombre pair d'équipes pour éviter un adversaire manquant
        if (teams.length % 2 !== 0) {
            teams.pop(); // Retirer une équipe si le nombre est impair
        }
        for (let i = 0; i < teams.length; i += 2) {
            if (teams[i + 1]) {
                roundMatches.push([teams[i], teams[i + 1]]);
            }
        }
        matches.push(roundMatches);
    }

    return matches;
}


// Fonction pour mélanger les joueurs
function shufflePlayers(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function shuffleTeams(teams) {
    for (let i = teams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teams[i], teams[j]] = [teams[j], teams[i]];
    }
    return teams;
}

function displayTournament(matches) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '<h1>Tournoi de Pétanque Mêlée</h1>';

    matches.forEach((round, roundIndex) => {
        const roundElement = document.createElement('div');
        roundElement.innerHTML = `<h2>Partie ${roundIndex + 1}</h2>`;
        round.forEach(match => {
            // Vérifier que les deux équipes sont présentes
            if (match.length === 2) {
                const team1Players = match[0].players.join('-');
                const team2Players = match[1].players.join('-');
                const matchElement = document.createElement('div');
                matchElement.textContent = `${team1Players} vs ${team2Players}`;
                roundElement.appendChild(matchElement);
            }
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
