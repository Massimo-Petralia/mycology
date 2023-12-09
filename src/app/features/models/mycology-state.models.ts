import { Mushroom } from "./mushroom.models";

export interface MycologyState {
    mushrooms: Mushroom[],
    xtotalcount: number
    pageIndex:  number 
}

export const initialState: MycologyState = {
    mushrooms: [],
    xtotalcount: 0,
    pageIndex:0
}