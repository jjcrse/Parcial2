import { store } from "../flux/Store";
import { Plant } from "../services/Plants";

class GardenView extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe(() => this.render());
        this.render();
    }

    render() {
        const { plants, garden } = store.getState();
        console.log(plants)
        const gardenPlants: Plant[] = plants
            .filter(p => garden.plantIds.includes(p.id))
            .sort((a, b) => a.commonName.localeCompare(b.commonName));

        this.shadow.innerHTML = `
            <h2>${garden.name}</h2>
            <div class="grid">
                ${gardenPlants.map(p => this.renderCard(p)).join("")}
            </div>
            <style>
                h2 {
                    text-align: center;
                    font-size: 1.5em;
                    margin-bottom: 1em;
                }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                }
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 1em;
                    text-align: center;
                    background: #fff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
                .card img {
                    max-width: 100%;
                    max-height: 150px;
                    object-fit: cover;
                    border-radius: 6px;
                }
                .name {
                    font-weight: bold;
                    margin-top: 0.5em;
                }
                .sci {
                    font-style: italic;
                    color: #555;
                }
            </style>
        `;
    }

    renderCard(plant: Plant): string {
        return `
            <div class="card">
                <img src="${plant.img}" alt="${plant.commonName}" />
                <div class="name">${plant.commonName}</div>
                <div class="sci">${plant.scientificName}</div>
            </div>
        `;
    }
}

//!El hijoeperra Jardin no se me quiere mostrar

export default  GardenView
