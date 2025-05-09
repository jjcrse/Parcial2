import { State } from "../flux/Store";

export function isStateValid(state: State): boolean {
    return Array.isArray(state.plants) && typeof state.currentPage === "string";
}
