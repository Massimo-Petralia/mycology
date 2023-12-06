import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MycologyState } from "../models/mycology-state.models";

export const selectFeature = createFeatureSelector<MycologyState>('mycology');

export const selectMushrooms = createSelector(
    selectFeature,
    ({mushrooms}) => mushrooms
)

export const selectXtotalcount = createSelector(
    selectFeature,
    ({xtotalcount}) => xtotalcount
)

export const selectPageIndex = createSelector(
    selectFeature,
    ({pageIndex}) => pageIndex
)