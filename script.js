// URL des données
const dataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'; // Ou changez l'URL pour movie-data.json ou video-game-sales-data.json

// Sélection des éléments HTML
const treeMapContainer = document.getElementById('tree-map');
const legendContainer = document.getElementById('legend');
const tooltip = document.getElementById('tooltip');

// Fonction pour charger les données
async function loadData() {
    const response = await fetch(dataURL);
    const data = await response.json();
    renderTreeMap(data);
    renderLegend(data);
}

// Fonction pour rendre la carte arborescente
function renderTreeMap(data) {
    const tileData = data.children; // Data des tuiles à partir des enfants (par exemple pour Kickstarter : categories)
    
    tileData.forEach(category => {
        category.children.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.style.backgroundColor = getColorForTile(tile);
            tileElement.style.width = `${tile.value * 0.1}px`; // La taille de la tuile est déterminée par la data-value
            tileElement.style.height = `${tile.value * 0.1}px`;
            tileElement.dataset.name = tile.name;
            tileElement.dataset.category = category.name;
            tileElement.dataset.value = tile.value;
            
            tileElement.addEventListener('mouseenter', showTooltip);
            tileElement.addEventListener('mouseleave', hideTooltip);
            
            treeMapContainer.appendChild(tileElement);
        });
    });
}

// Fonction pour obtenir la couleur d'une tuile
function getColorForTile(tile) {
    return tile.category === 'Technology' ? '#4CAF50' : '#FFC107'; // Exemple de couleurs
}

// Fonction pour afficher la légende
function renderLegend(data) {
    const categories = data.children;
    
    categories.forEach(category => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.style.backgroundColor = getColorForTile({ category: category.name });
        legendContainer.appendChild(legendItem);
    });
}

// Fonction pour afficher l'info-bulle
function showTooltip(event) {
    const { name, category, value } = event.target.dataset;
    
    tooltip.textContent = `Nom: ${name}, Catégorie: ${category}, Valeur: ${value}`;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

// Fonction pour masquer l'info-bulle
function hideTooltip() {
    tooltip.style.display = 'none';
}

// Charger les données et rendre le tout
loadData();
