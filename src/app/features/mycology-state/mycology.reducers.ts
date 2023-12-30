import { createReducer, on } from '@ngrx/store';
import { initialState } from '../models/mycology-state.models';
import * as MushroomsActions from './mycology.actions';

export const mushroomsReducer = createReducer(
  initialState,
  on(
    MushroomsActions.loadMushroomsSucces,
    (mycologyState, { mushrooms, xtotalcount, pageIndex }) => ({
      ...mycologyState,
      mushrooms,
      xtotalcount,
      pageIndex,
    })
  ),
  on(
    MushroomsActions.createMushroomSucces,
    (mycologyState, { mushroom, xtotalcount }) => ({
      ...mycologyState,
      mushrooms:
        mycologyState.mushrooms.length < 10
          ? [...mycologyState.mushrooms, mushroom]
          : [...mycologyState.mushrooms],

      xtotalcount,
    })
  ),
  on(MushroomsActions.updateMushroomSucces, (mycologyState, { mushroom }) => ({
    ...mycologyState,
    mushrooms: [
      ...mycologyState.mushrooms.map((item) =>
        item.id !== mushroom.id ? item : mushroom
      ),
    ],
  })),
  on(
    MushroomsActions.deleteMushroomSucces,
    (mycologyState, { id, xtotalcount }) => ({
      ...mycologyState,
      mushrooms: [...mycologyState.mushrooms.filter((item) => item.id !== id)],
      xtotalcount,
    })
  ),
  on(
    MushroomsActions.loadIconographySucces,
    (mycologyState, { iconographydata }) => ({
      ...mycologyState,
      iconographydata
    })
  ),
  on(MushroomsActions.updateIconographySucces, (mycologyState, {iconographydata})=>  ({...mycologyState, iconographydata}))
);
