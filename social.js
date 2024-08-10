const icons = document.querySelectorAll('.icon');

// Fonction pour changer la couleur et agrandir l'icône au survol
icons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.setAttribute('color', '#64ffda'); // Changer la couleur
        icon.setAttribute('fill', '#64ffda'); // Changer la couleur
        icon.style.transform = 'scale(1.2)'; // Agrandir l'icône
        icon.style.transition = 'transform 0.3s ease'; // Transition douce pour l'agrandissement
        icon.style.cursor = 'pointer'; // Changer le curseur
        icon.querySelector('path').setAttribute('fill', '#64ffda'); // Changer la couleur
    });

    icon.addEventListener('mouseout', () => {
        icon.setAttribute('color', '#8892b0'); // Remettre la couleur d'origine
        icon.setAttribute('fill', '#8892b0'); // Remettre la couleur d'origine
        icon.style.transform = 'scale(1)'; // Revenir à la taille normale
        icon.querySelector('path').setAttribute('fill', '#8892b0'); // Remettre la couleur d'origine
    });
});
