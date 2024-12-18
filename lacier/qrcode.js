document.getElementById('generate-qr-btn').addEventListener('click', () => {
    const url = document.getElementById('qr-url').value.trim();
    if (!url) return;
  
    // Créer un container temporaire
    const tempDiv = document.createElement('div');
    // Générer le QR code (100x100 par exemple)
    const qr = new QRCode(tempDiv, {
      text: url,
      width: 100,
      height: 100
    });
  
    // Le QRCode.js génère soit un canvas, soit une image (selon la config)
    // On va attendre un court instant que l’image soit générée
    setTimeout(() => {
      // Récupérer l'image du QR code généré
      const img = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
      if (img && img.src) {
        // On passe cette source à createImageElement
        createImageElement(img.src);
      }
    }, 500);
  });
  