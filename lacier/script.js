// Gestion des onglets principaux
const navItems = document.querySelectorAll('.nav-item');
const panels = {
    texte: document.getElementById('texte-panel'),
    taille: document.getElementById('taille-panel'),
    matiere: document.getElementById('matiere-panel'),
    coloris: document.getElementById('coloris-panel'),
    fixation: document.getElementById('fixation-panel')
};
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const panelToShow = item.getAttribute('data-panel');
        for (const key in panels) {
            panels[key].style.display = (key===panelToShow)?'flex':'none';
        }
    });
});

// Onglets internes (texte/image/forme/cadre/qr)
const internalTabs = document.querySelectorAll('.internal-tab');
internalTabs.forEach(btn => {
    btn.addEventListener('click', () => {
        internalTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const subPanelToShow = btn.getAttribute('data-subpanel');
        document.querySelectorAll('.sub-panel').forEach(sp => sp.classList.remove('active'));
        document.getElementById(subPanelToShow).classList.add('active');
    });
});

let elements = [];
let selectedElementId = null;
const addTextBtn = document.getElementById('add-text-btn');
const plaqueContainer = document.getElementById('plaque-container');
const elementsList = document.getElementById('elements-list');
const textSettings = document.getElementById('text-settings');
const imageSettings = document.getElementById('image-settings');
const textContentInput = document.getElementById('text-content');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const boldBtn = document.getElementById('bold-btn');
const italicBtn = document.getElementById('italic-btn');
const underlineBtn = document.getElementById('underline-btn');
const alignLeftBtn = document.getElementById('align-left');
const alignCenterBtn = document.getElementById('align-center');
const alignRightBtn = document.getElementById('align-right');
const fontColorInput = document.getElementById('font-color');

const guideHorizontal = document.getElementById('guide-horizontal');
const guideVertical = document.getElementById('guide-vertical');

function createTextElement(content="Nouveau texte") {
    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'draggable-element';
    div.innerText = content;
    div.style.fontSize = '40px';
    div.style.fontFamily = 'Arial';
    div.style.fontWeight = 'normal';
    div.style.fontStyle = 'normal';
    div.style.textDecoration = 'none';
    div.style.color = '#000';
    div.style.textAlign = 'left';
    div.style.left = '50%';
    div.style.top = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    plaqueContainer.appendChild(div);

    div.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Empêche le clic de remonter et de désélectionner
        selectElement(id);
    });

    elements.push({
        id,
        type:'text',
        content,
        fontSize:40,
        fontFamily:'Arial',
        fontWeight:'normal',
        fontStyle:'normal',
        textDecoration:'none',
        color:'#000',
        textAlign:'left',
        x:50, y:50,
        rotation:0,
        scale:1,
        elementNode:div
    });
    updateElementsList();
    selectElement(id);
}

addTextBtn.addEventListener('click', () => {
    createTextElement('Test');
});

// Importer une image
document.getElementById('upload-image-input').addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        createImageElement(e.target.result);
    }
    reader.readAsDataURL(file);
});

function createImageElement(src) {
    const id = Date.now();
    const div = document.createElement('div');
    div.className='draggable-element';
    const img = document.createElement('img');
    img.src=src;
    div.appendChild(img);
    div.style.left='50%';
    div.style.top='50%';
    div.style.transform='translate(-50%,-50%)';
    plaqueContainer.appendChild(div);

    div.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        selectElement(id);
    });

    elements.push({
        id,
        type:'image',
        src,
        x:50,y:50,
        rotation:0, scale:1,
        elementNode:div
    });
    updateElementsList();
    selectElement(id);
}


// Ajouter une forme (traitons-les comme des images simples, on met un fond noir par exemple)
document.querySelectorAll('.shapes-grid div').forEach(shapeDiv => {
    shapeDiv.addEventListener('click', () => {
        const shape = shapeDiv.getAttribute('data-shape');
        // On va créer un élément "forme" sous forme d'un div noir. Pour simplifier, un carré noir ?
        createShapeElement(shape);
    });
});

function createShapeElement(shape) {
    // Pour simplifier, on va juste mettre un div avec un background noir.
    // Selon le shape, on peut mettre une forme via CSS (border-radius pour un cercle, etc.)
    const id = Date.now();
    const div = document.createElement('div');
    div.className='draggable-element';
    div.style.width='100px';
    div.style.height='100px';
    div.style.background='#000';
    if (shape==='circle') div.style.borderRadius='50%';
    if (shape==='star') {
        // Pour la star, on pourrait mettre un background image SVG, ou un pseudo-élément complexe.
        // Pour le demo, on met juste un text "★".
        div.innerText='★';
        div.style.color='#fff';
        div.style.fontSize='60px';
        div.style.textAlign='center';
        div.style.lineHeight='100px';
    }
    if (shape==='triangle') {
        // Triangle via CSS
        div.style.width='0px';
        div.style.height='0px';
        div.style.background='transparent';
        div.style.borderLeft='50px solid transparent';
        div.style.borderRight='50px solid transparent';
        div.style.borderBottom='100px solid #000';
    }

    div.style.left='50%';
    div.style.top='50%';
    div.style.transform='translate(-50%,-50%)';
    plaqueContainer.appendChild(div);

    // Ajout de l'écouteur pour sélectionner l'élément
    div.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        selectElement(id);
    });

    elements.push({
        id,
        type:'shape',
        shape,
        x:50,y:50,
        rotation:0,scale:1,
        elementNode:div
    });
    updateElementsList();
    selectElement(id);
}

// Ajouter un cadre (pareil que forme, mais type:'frame')
// document.querySelectorAll('.frames-grid div').forEach(frameDiv => {
//     frameDiv.addEventListener('click', () => {
//         const frameType = frameDiv.getAttribute('data-frame');
//         createFrameElement(frameType);
//     });
// });
function createFrameElement(frameType) {
    const id = Date.now();
    const div=document.createElement('div');
    div.className='draggable-element';
    div.style.width='300px';
    div.style.height='200px';
    div.style.border='4px solid #000';
    if (frameType==='dashed') div.style.borderStyle='dashed';
    if (frameType==='dotted') div.style.borderStyle='dotted';
    if (frameType==='double') div.style.borderStyle='double';
    // On a un cadre
    div.style.left='50%';
    div.style.top='50%';
    div.style.transform='translate(-50%,-50%)';
    plaqueContainer.appendChild(div);

    // Ajout de l'écouteur pour sélectionner l'élément
    div.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        selectElement(id);
    });

    elements.push({
        id,
        type:'frame',
        frameType,
        x:50,y:50,
        rotation:0,scale:1,
        elementNode:div
    });
    updateElementsList();
    selectElement(id);
}

// QR code
// document.getElementById('generate-qr-btn').addEventListener('click', () => {
//     const url = document.getElementById('qr-url').value.trim();
//     if (!url) return;
//     const qrSrc = 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' + encodeURIComponent(url);
//     createImageElement(qrSrc);
    
// });

function updateElementsList() {
    elementsList.innerHTML='';
    elements.forEach(el => {
        const item=document.createElement('div');
        item.className='element-item';
        if (el.id===selectedElementId) item.classList.add('selected');
        let label=el.type==='text'?el.content:(el.type==='image'?'Image':(el.type==='shape'?'Forme':(el.type==='frame'?'Cadre':'QR')));
        item.innerHTML=`<span>${label}</span><div class="element-actions"><i title="Supprimer" data-action="delete">🗑️</i></div>`;
        item.addEventListener('click', ()=> selectElement(el.id));
        item.querySelector('.element-actions').addEventListener('click',(e)=>{
            e.stopPropagation();
            if (e.target.getAttribute('data-action')==='delete') {
                deleteElement(el.id);
            }
        });
        elementsList.appendChild(item);
    });
}

function selectElement(id) {
    selectedElementId = id;
    updateElementsList();
    showSelectionBox();
    updateUIForSelectedElement();
}

function getSelectedElement() {
    return elements.find(e=>e.id===selectedElementId);
}

function deleteElement(id) {
    const el=elements.find(e=>e.id===id);
    if (el && el.elementNode && el.elementNode.parentNode) {
        el.elementNode.parentNode.removeChild(el.elementNode);
    }
    elements=elements.filter(e=>e.id!==id);
    hideSelectionBox();
    selectedElementId=null;
    updateElementsList();
    textSettings.style.display='none';
    imageSettings.style.display='none';
}

let selectionBox=null,rotateHandle=null,resizeHandle=null;

function showSelectionBox() {
    const el = getSelectedElement();
    if (!el) { hideSelectionBox(); return; }

    if (selectionBox && selectionBox.parentNode) {
        plaqueContainer.removeChild(selectionBox);
        selectionBox = null;
    }

    selectionBox = document.createElement('div');
    selectionBox.className = 'element-box';
    plaqueContainer.appendChild(selectionBox);

    rotateHandle = document.createElement('div');
    rotateHandle.className = 'rotate-handle';
    rotateHandle.innerHTML = '⟳';
    selectionBox.appendChild(rotateHandle);

    // Création des 4 poignées de redimensionnement aux coins
    const resizeHandles = [
        { class: 'resize-handle-tl', cursor: 'nwse-resize' },
        { class: 'resize-handle-tr', cursor: 'nesw-resize' },
        { class: 'resize-handle-bl', cursor: 'nesw-resize' },
        { class: 'resize-handle-br', cursor: 'nwse-resize' }
    ];

    resizeHandles.forEach(h => {
        const handle = document.createElement('div');
        handle.className = h.class;
        handle.style.cursor = h.cursor;
        selectionBox.appendChild(handle);
        initResizeHandle(handle, el.elementNode, h.class);
    });

    positionSelectionBox(el.elementNode);

    initDragAndDrop(el.elementNode);
    initRotate(rotateHandle, el.elementNode);

    // Supprimer l'appel à initResize(resizeHandle, el.elementNode); 
    // puisque l'on n'a plus de resizeHandle unique.
}

  

function positionSelectionBox(elem) {
    const rect=elem.getBoundingClientRect();
    const containerRect=plaqueContainer.getBoundingClientRect();
    selectionBox.style.width=rect.width+'px';
    selectionBox.style.height=rect.height+'px';
    selectionBox.style.left=(rect.left-containerRect.left)+'px';
    selectionBox.style.top=(rect.top-containerRect.top)+'px';
}

function hideSelectionBox() {
    if (selectionBox) {
        plaqueContainer.removeChild(selectionBox);
        selectionBox=null;rotateHandle=null;resizeHandle=null;
    }
}

let isDragging=false;let dragOffsetX=0;let dragOffsetY=0;
let isRotating=false;let startAngle=0;
let isResizing=false;let startDist=0;let startScale=1;

function initDragAndDrop(elementNode) {
    elementNode.onmousedown=startDrag;
    function startDrag(e) {
        const el=getSelectedElement();
        if (!el) return;
        if (e.target.classList.contains('rotate-handle')||e.target.classList.contains('resize-handle')) return;
        isDragging=true;
        const rect=elementNode.getBoundingClientRect();
        dragOffsetX=e.clientX-rect.left;
        dragOffsetY=e.clientY-rect.top;
        document.addEventListener('mousemove',doDrag);
        document.addEventListener('mouseup',stopDrag);
    }

    function doDrag(e) {
        if (!isDragging) return;
        const el = getSelectedElement();
        if (!el) return;
        const containerRect=plaqueContainer.getBoundingClientRect();
    
        let newLeft=e.clientX-containerRect.left-dragOffsetX;
        let newTop=e.clientY-containerRect.top-dragOffsetY;
    
        const pw=plaqueContainer.offsetWidth;
        const ph=plaqueContainer.offsetHeight;
        const snapThreshold=10;
    
        // Calcul du centre de l'élément en cours de déplacement
        const elemCenterX = newLeft+(elementNode.offsetWidth/2);
        const elemCenterY = newTop+(elementNode.offsetHeight/2);
    
        // Variables pour savoir si on affiche les guides
        let showVLine=false; 
        let showHLine=false;
        let snapX = null; 
        let snapY = null;
    
        // Vérifier le centrage par rapport au plateau (déjà existant)
        const centerX=pw/2; 
        const centerY=ph/2;
        if (Math.abs(elemCenterX-centerX)<snapThreshold) {
            snapX = centerX-(elementNode.offsetWidth/2);
            showVLine=true;
        }
        if (Math.abs(elemCenterY-centerY)<snapThreshold) {
            snapY = centerY-(elementNode.offsetHeight/2);
            showHLine=true;
        }
    
        // --- NOUVEAU : Vérifier les ancres par rapport aux autres éléments ---
        // On parcourt tous les autres éléments pour trouver leurs centres
        for (const otherEl of elements) {
            if (otherEl.id === el.id) continue; // ignore l'élément en cours
            const otherNode = otherEl.elementNode;
            const otherRect = otherNode.getBoundingClientRect();
    
            // Calcul du centre de l'autre élément
            const otherCenterX = (otherRect.left + otherRect.width/2) - containerRect.left;
            const otherCenterY = (otherRect.top + otherRect.height/2) - containerRect.top;
    
            // Vérification alignement vertical (centres horizontaux alignés)
            if (Math.abs(elemCenterX - otherCenterX) < snapThreshold) {
                snapX = otherCenterX - (elementNode.offsetWidth/2);
                showVLine = true;
            }
    
            // Vérification alignement horizontal (centres verticaux alignés)
            if (Math.abs(elemCenterY - otherCenterY) < snapThreshold) {
                snapY = otherCenterY - (elementNode.offsetHeight/2);
                showHLine = true;
            }
        }
    
        // Appliquer le snapping si nécessaire
        if (snapX !== null) newLeft = snapX;
        if (snapY !== null) newTop = snapY;
    
        elementNode.style.left=newLeft+'px';
        elementNode.style.top=newTop+'px';
        el.x=((newLeft+(elementNode.offsetWidth/2))/pw)*100;
        el.y=((newTop+(elementNode.offsetHeight/2))/ph)*100;
        elementNode.style.transform=`translate(0,0) rotate(${el.rotation}deg) scale(${el.scale})`;
        positionSelectionBox(elementNode);
    
        // Mettre à jour l'affichage des guides
        if (showVLine) {
            guideVertical.style.left=( (snapX!==null?snapX+(elementNode.offsetWidth/2):centerX) )+'px';
            guideVertical.style.display='block';
        } else {
            guideVertical.style.display='none';
        }
    
        if (showHLine) {
            guideHorizontal.style.top=( (snapY!==null?snapY+(elementNode.offsetHeight/2):centerY) )+'px';
            guideHorizontal.style.display='block';
        } else {
            guideHorizontal.style.display='none';
        }
    }

    function stopDrag() {
        isDragging=false;
        document.removeEventListener('mousemove',doDrag);
        document.removeEventListener('mouseup',stopDrag);
        guideVertical.style.display='none';
        guideHorizontal.style.display='none';
    }
}

function initRotate(handle,elementNode) {
    handle.onmousedown=startRotate;
    function startRotate(e) {
        e.stopPropagation();
        isRotating=true;
        const el=getSelectedElement();
        if (!el)return;
        const rect=elementNode.getBoundingClientRect();
        const centerX=rect.left+rect.width/2;
        const centerY=rect.top+rect.height/2;
        startAngle=Math.atan2(e.clientY-centerY,e.clientX-centerX)-(el.rotation*Math.PI/180);
        document.addEventListener('mousemove',doRotate);
        document.addEventListener('mouseup',stopRotate);
    }
    function doRotate(e) {
        if(!isRotating)return;
        const el=getSelectedElement();
        const rect=elementNode.getBoundingClientRect();
        const centerX=rect.left+rect.width/2;
        const centerY=rect.top+rect.height/2;
        const angle=Math.atan2(e.clientY-centerY,e.clientX-centerX)-startAngle;
        const deg=angle*(180/Math.PI);
        el.rotation=deg;
        elementNode.style.transform=`translate(0,0) rotate(${deg}deg) scale(${el.scale})`;
        positionSelectionBox(elementNode);
    }
    function stopRotate() {
        isRotating=false;
        document.removeEventListener('mousemove',doRotate);
        document.removeEventListener('mouseup',stopRotate);
    }
}

function initResizeHandle(handle, elementNode, handleClass) {
    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startScaleX = 1;
    let startScaleY = 1;
  
    handle.addEventListener('mousedown', startResize);
  
    function startResize(e) {
      e.stopPropagation();
      const el = getSelectedElement();
      if (!el) return;
  
      const rect = elementNode.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      startWidth = rect.width;
      startHeight = rect.height;
      startScaleX = el.scale; 
      startScaleY = el.scale; // on part sur un scale uniforme (même pour X et Y)
      isResizing = true;
  
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    }
  
    function doResize(e) {
        if (!isResizing) return;
        const el = getSelectedElement();
        if (!el) return;
      
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
      
        // Calculer un scale factor basé sur les dimensions d'origine
        // si deltaX est négatif et important, (startWidth + deltaX) < startWidth, le ratio sera < 1
        const scaleX = (startWidth + deltaX) / startWidth;
        const scaleY = (startHeight + deltaY) / startHeight;
      
        // Pour un redimensionnement uniforme, on peut prendre la moyenne ou le max/min.
        // Ici, on choisit de prendre la valeur la plus adaptée pour conserver une forme à peu près cohérente.
        // Prenons le ratio qui s'éloigne le plus de 1 pour un effet "uniforme".
        const scaleFactor = Math.abs(scaleX) > Math.abs(scaleY) ? scaleX : scaleY;
      
        // Empêcher le scale de devenir trop petit ou négatif
        const minScale = 0.1;
        const newScale = Math.max(scaleFactor * startScaleX, minScale);
      
        el.scale = newScale;
        elementNode.style.transform = `translate(0,0) rotate(${el.rotation}deg) scale(${el.scale})`;
        positionSelectionBox(elementNode);
      }
      
  
    function stopResize() {
      isResizing = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    }
  }
  

function updateUIForSelectedElement() {
    const el=getSelectedElement();
    if(!el) {
        textSettings.style.display='none';
        imageSettings.style.display='none';
        return;
    }
    if(el.type==='text') {
        textSettings.style.display='block';
        imageSettings.style.display='none';
        textContentInput.value=el.content;
        fontFamilySelect.value=el.fontFamily;
        fontSizeInput.value=el.fontSize;
        fontColorInput.value=el.color;
        boldBtn.classList.toggle('active',el.fontWeight==='bold');
        italicBtn.classList.toggle('active',el.fontStyle==='italic');
        underlineBtn.classList.toggle('active',el.textDecoration==='underline');
        alignLeftBtn.classList.remove('active');
        alignCenterBtn.classList.remove('active');
        alignRightBtn.classList.remove('active');
        if(el.textAlign==='center') alignCenterBtn.classList.add('active');
        else if(el.textAlign==='right') alignRightBtn.classList.add('active');
        else alignLeftBtn.classList.add('active');
    } else {
        textSettings.style.display='none';
        imageSettings.style.display='block';
    }
}

function applyChanges() {
    const el=getSelectedElement();
    if(!el||el.type!=='text')return;
    el.content=textContentInput.value;
    el.fontFamily=fontFamilySelect.value;
    el.fontSize=parseInt(fontSizeInput.value,10)||40;
    el.color=fontColorInput.value;
    el.fontWeight=boldBtn.classList.contains('active')?'bold':'normal';
    el.fontStyle=italicBtn.classList.contains('active')?'italic':'normal';
    el.textDecoration=underlineBtn.classList.contains('active')?'underline':'none';
    let selectedAlign='left';
    if(alignCenterBtn.classList.contains('active')) selectedAlign='center';
    if(alignRightBtn.classList.contains('active')) selectedAlign='right';
    el.textAlign=selectedAlign;

    const elem=el.elementNode;
    elem.innerText=el.content;
    elem.style.fontFamily=el.fontFamily;
    elem.style.fontSize=el.fontSize+'px';
    elem.style.color=el.color;
    elem.style.fontWeight=el.fontWeight;
    elem.style.fontStyle=el.fontStyle;
    elem.style.textDecoration=el.textDecoration;
    elem.style.textAlign=el.textAlign;

    const offsetX=(el.x/100)*plaqueContainer.offsetWidth-(elem.offsetWidth/2);
    const offsetY=(el.y/100)*plaqueContainer.offsetHeight-(elem.offsetHeight/2);
    elem.style.left=offsetX+'px';
    elem.style.top=offsetY+'px';
    elem.style.transform=`translate(0,0) rotate(${el.rotation}deg) scale(${el.scale})`;
    positionSelectionBox(elem);
    updateElementsList();
}

textContentInput.addEventListener('input',applyChanges);
fontFamilySelect.addEventListener('change',applyChanges);
fontSizeInput.addEventListener('input',applyChanges);
fontColorInput.addEventListener('input',applyChanges);

boldBtn.addEventListener('click',()=>{boldBtn.classList.toggle('active');applyChanges();});
italicBtn.addEventListener('click',()=>{italicBtn.classList.toggle('active');applyChanges();});
underlineBtn.addEventListener('click',()=>{underlineBtn.classList.toggle('active');applyChanges();});

alignLeftBtn.addEventListener('click',()=>{
    alignLeftBtn.classList.add('active');
    alignCenterBtn.classList.remove('active');
    alignRightBtn.classList.remove('active');
    applyChanges();
});
alignCenterBtn.addEventListener('click',()=>{
    alignLeftBtn.classList.remove('active');
    alignCenterBtn.classList.add('active');
    alignRightBtn.classList.remove('active');
    applyChanges();
});
alignRightBtn.addEventListener('click',()=>{
    alignLeftBtn.classList.remove('active');
    alignCenterBtn.classList.remove('active');
    alignRightBtn.classList.add('active');
    applyChanges();
});

document.querySelector('.canvas-area').addEventListener('click', (e) => {
    // Vérifiez si le clic n'est pas sur un élément
    if (!e.target.closest('.draggable-element')) {
        selectedElementId = null; // Aucun élément sélectionné
        hideSelectionBox(); // Masquer le panneau d'édition
        textSettings.style.display = 'none';
        imageSettings.style.display = 'none';
        updateElementsList(); // Mettre à jour la liste
    }
});

// Fonction pour mettre à jour les fixations sur le canvas
function updateFixation(type) {
    // Efface les fixations existantes
    const existingFixations = document.querySelectorAll('.fixation');
    existingFixations.forEach(fixation => fixation.remove());

    // Si aucune fixation n'est sélectionnée, on quitte
    if (type === 'sans-fixation') return;

    // Ajoute les fixations aux 4 coins
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    positions.forEach(position => {
        const fixation = document.createElement('div');
        fixation.className = `fixation ${position}`;
        // Ajoutez une image correspondant au type de fixation
        switch (type) {
            case 'vis':
                fixation.style.backgroundImage = "url('images/vis.png')";
                break;
            case 'vis-cache':
                fixation.style.backgroundImage = "url('images/cache-vis.png')";
                break;
            case 'entretoises':
                fixation.style.backgroundImage = "url('images/entretoises.png')";
                break;
            case 'ventouses':
                fixation.style.backgroundImage = "url('images/ventouses.png')";
                break;
            case 'magnetique':
                fixation.style.backgroundImage = "url('images/magnetique.png')";
                break;
            default:
                fixation.style.backgroundImage = '';
        }
        fixation.style.backgroundSize = 'contain';
        fixation.style.backgroundRepeat = 'no-repeat';
        fixation.style.backgroundPosition = 'center';
        document.querySelector('.plaque-container').appendChild(fixation);
    });
}

// Ajout d'un événement pour gérer les clics sur les options de fixation
document.querySelectorAll('.fixation-option').forEach(option => {
    option.addEventListener('click', () => {
        const fixationType = option.getAttribute('data-fixation');
        updateFixation(fixationType);
    });

    //mettre une couleur différente sur l'option sélectionnée
    option.addEventListener('click', () => {
        document.querySelectorAll('.fixation-option').forEach(option => {
            option.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

// Fonction pour mettre à jour la matière
function updateMatiere(material) {
    const plaqueContainer = document.querySelector('.plaque-container');
    
    // Réinitialisation des styles pour éviter les résidus
    plaqueContainer.style.backgroundColor = '';
    plaqueContainer.style.filter = '';
    plaqueContainer.style.backgroundImage = '';

    // Applique les styles spécifiques en fonction du matériau
    switch (material) {
        case 'plexiglass':
            plaqueContainer.style.backgroundColor = '#c7c6cb1a';
            plaqueContainer.style.filter = 'drop-shadow(rgba(199, 198, 203, 0.1) -1mm 1mm 2mm) drop-shadow(rgba(0, 0, 0, 0.2) -2.25mm 2.25mm 2mm)';
            break;
        case 'aluminium':
            plaqueContainer.style.backgroundColor = '#ccc';
            plaqueContainer.style.backgroundImage = 'url("https://otypo.com/images/signs/textures/effect-anodized.webp")';
            break;
        case 'laiton':
            plaqueContainer.style.backgroundColor = '#c68c11';
            plaqueContainer.style.backgroundImage = 'url("https://otypo.com/images/signs/textures/effect-reflection-shiny-street.webp")';
            break;
        default:
            plaqueContainer.style.backgroundColor = '#efefef';
    }
}

// Ajout des événements aux options de matière
document.querySelectorAll('.matiere-option').forEach(option => {
    option.addEventListener('click', () => {
        const material = option.querySelector('img').alt.toLowerCase(); // Utilise l'attribut alt pour identifier le matériel
        updateMatiere(material); // Met à jour le style de la plaque
    });
});





// Init un texte par défaut
createTextElement('Test');