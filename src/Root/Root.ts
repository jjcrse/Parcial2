import { store } from "../flux/Store";
import { Actions } from "../flux/Actions";
import "../components/GardenView";
import "../components/EditGarden";
import "../components/EditplantForm";

class Root extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe(this.render.bind(this));
        this.render();
        this.loadData();
    }

    async loadData() {
        const { getPlants } = await import("../services/Plants");
        const plants = await getPlants();
        console.log(plants)
        Actions.loadPlants(plants);
    }

    render() {
        const state = store.getState();

        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <nav>
                <button id="inicio">Inicio</button>
                <button id="modificar-jardin">Modificar Jardín</button>
                <button id="modificar-plantas">Modo Admin</button>
            </nav>
            <main>
                <garden-view></garden-view>
                
            </main>
            <style>
                nav { display: flex; gap: 8px; margin-bottom: 16px; }
                button { padding: 6px 12px; }
            </style>
        `;

        this.shadowRoot?.querySelector("#inicio")?.addEventListener("click", () =>
            Actions.setPage("inicio")
        );
        this.shadowRoot?.querySelector("#modificar-jardin")?.addEventListener("click", () =>
            Actions.setPage("modificar-jardin")
        );
        this.shadowRoot?.querySelector("#modificar-plantas")?.addEventListener("click", () =>
            Actions.setPage("modificar-plantas")
        );
    }
}

export default Root;


//!Nos vemos el otro semestre
