import { Dispatcher, Action, Plant } from "./Dispatcher";
import { ActionType } from "./Actions";
import { getPlants } from "../services/Plants";


export interface State {
    plants: Plant[];
    garden: {
        name: string;
        plantIds: number[];
    };
    currentPage: "inicio" | "modificar-jardin" | "modificar-plantas";
}

type Listener = (state: State) => void;

export const AppDispatcher = new Dispatcher();

class Store {
    private state: State = {
        plants: [],
        garden: {
            name: "Mi Jardín",
            plantIds: []
        },
        currentPage: "inicio"
    };

    private listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this.reduce.bind(this));
    }

    private reduce(action: Action) {
        switch (action.type) {
            case ActionType.LOAD_PLANTS:
                this.state.plants = action.payload;
                break;

            case ActionType.SET_PAGE:
                this.state.currentPage = action.payload;
                break;

            case ActionType.UPDATE_PLANT:
                const updated = action.payload;
                this.state.plants = this.state.plants.map(p =>
                    p.id === updated.id ? updated : p
                );
                break;

            case ActionType.TOGGLE_PLANT_IN_GARDEN:
                const id = action.payload;
                const index = this.state.garden.plantIds.indexOf(id);
                if (index >= 0) {
                    this.state.garden.plantIds.splice(index, 1);
                } else {
                    this.state.garden.plantIds.push(id);
                }
                break;

            case ActionType.SET_GARDEN_NAME:
                this.state.garden.name = action.payload;
                break;
        }

        this.notify();
    }

    public getState(): State {
        return structuredClone(this.state);
    }

    public subscribe(listener: Listener) {
        this.listeners.push(listener);
    }

    private notify() {
        for (const listener of this.listeners) {
            listener(this.getState());
        }
    }
}

export const store = new Store();
