const dataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'; // URL des données de ventes de jeux vidéo

const treeMapContainer = document.getElementById('tree-map');
const legendContainer = document.getElementById('legend');
const tooltip = document.getElementById('tooltip');

// Fonction pour charger les données et dessiner la carte
async function loadData() {
    const response = await fetch(dataURL);
    const data = await response.json();
    renderTreeMap(data);
    renderLegend(data);
}

// Fonction pour générer la carte arborescente avec D3.js
function renderTreeMap(data) {
    const width = 960;
    const height = 600;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const treemap = d3.treemap()
        .size([width, height])
        .padding(1);

    const root = d3.hierarchy(data)
        .sum(d => d.value);

    treemap(root);

    const nodes = treeMapContainer.selectAll('div')
        .data(root.leaves())
        .enter().append('div')
        .style('position', 'absolute')
        .style('background-color', d => color(d.parent.data.name))
        .style('left', d => `${d.x0}px`)
        .style('top', d => `${d.y0}px`)
        .style('width', d => `${d.x1 - d.x0}px`)
        .style('height', d => `${d.y1 - d.y0}px`)
        .attr('class', 'tile')
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip);

    // Info-bulle
    function showTooltip(event, d) {
        tooltip.style.display = 'block';
        tooltip.textContent = `${d.data.name} - ${d.data.category} - ${d.data.value}`;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
    }
}

// Fonction pour afficher la légende
function renderLegend(data) {
    const categories = data.children;

    categories.forEach(category => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.style.backgroundColor = d3.scaleOrdinal(d3.schemeCategory10)(category.name);
        legendContainer.appendChild(legendItem);
    });
}

// Charger les données
loadData();
