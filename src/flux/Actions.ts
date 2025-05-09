import { AppDispatcher } from "./Dispatcher";
import { Plant } from "../services/Plants";

export enum ActionType {
    LOAD_PLANTS = "LOAD_PLANTS",
    SET_PAGE = "SET_PAGE",
    UPDATE_PLANT = "UPDATE_PLANT",
    TOGGLE_PLANT_IN_GARDEN = "TOGGLE_PLANT_IN_GARDEN",
    SET_GARDEN_NAME = "SET_GARDEN_NAME"
}

export const Actions = {
    loadPlants: (plants: Plant[]) => {
        AppDispatcher.dispatch({ type: ActionType.LOAD_PLANTS, payload: plants });
    },

    setPage: (page: string) => {
        AppDispatcher.dispatch({ type: ActionType.SET_PAGE, payload: page });
    },

    updatePlant: (plant: Plant) => {
        AppDispatcher.dispatch({ type: ActionType.UPDATE_PLANT, payload: plant });
    },

    togglePlantInGarden: (plantId: number) => {
        AppDispatcher.dispatch({ type: ActionType.TOGGLE_PLANT_IN_GARDEN, payload: plantId });
    },

    setGardenName: (name: string) => {
        AppDispatcher.dispatch({ type: ActionType.SET_GARDEN_NAME, payload: name });
    }
};
