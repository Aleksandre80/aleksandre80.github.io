const plaqueFrame = document.getElementById('plaque-frame');

function applyFrameStyle(frameType) {
    switch(frameType) {
        case 'simple':
            plaqueFrame.style.border = '4px solid #000';
            break;
        case 'dashed':
            plaqueFrame.style.border = '4px dashed #000';
            break;
        case 'dotted':
            plaqueFrame.style.border = '4px dotted #000';
            break;
        case 'double':
            plaqueFrame.style.border = '8px double #000';
            break;
        default:
            // Aucun cadre
            plaqueFrame.style.border = 'none';
    }
}

// Lorsque l'utilisateur choisit un cadre
document.querySelectorAll('.frames-grid div').forEach(frameDiv => {
    frameDiv.addEventListener('click', () => {
        const frameType = frameDiv.getAttribute('data-frame');
        applyFrameStyle(frameType);
    });
});
