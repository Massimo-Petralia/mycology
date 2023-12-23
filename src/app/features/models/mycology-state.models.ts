import { IconographyData, Mushroom } from "./mushroom.models";

export interface MycologyState {
    mushrooms: Mushroom[];
    xtotalcount: number;
    pageIndex:  number;
    iconographydata: IconographyData | null

}

export const initialState: MycologyState = {
    mushrooms: [],
    xtotalcount: 0,
    pageIndex:0,
    iconographydata: null
}