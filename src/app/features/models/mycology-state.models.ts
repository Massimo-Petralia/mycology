import { Mushroom } from "./mushroom.models";

export interface MycologyState {
    mushrooms: Mushroom[]
}

export const initialState: MycologyState = {
    mushrooms: []
}