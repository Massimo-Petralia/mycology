import { Mushroom } from "./mushroom.models";

export interface MycologyState {
    mushrooms: Mushroom[],
    xtotalcount: number
    pageIndex:  number | null
}

export const initialState: MycologyState = {
    mushrooms: [],
    xtotalcount: 0,
    pageIndex:null
}