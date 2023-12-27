import { IconographyData, Mushroom } from "./mushroom.models";

export interface MycologyState {
    mushrooms: Mushroom[];
    xtotalcount: number;
    pageIndex:  number;
    iconographydata: IconographyData
}

export const initialState: MycologyState = {
    mushrooms: [],
    xtotalcount: 0,
    pageIndex:0,
    iconographydata: {
        mushroomID: 0,
        iconography: []
    }
}