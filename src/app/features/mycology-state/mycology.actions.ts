import { createAction, props } from "@ngrx/store";
import { Mushroom } from "../models/mushroom.models";

export const loadMushrooms = createAction(
    '[Mushrooms Page] Load Mushromms Request'
)

export const loadMushroomsSucces = createAction(
    '[Mushrooms API] Load Mushrooms Get Request Succes',
    props<{mushrooms: Mushroom[]}>()
)

export const loadMushroomsFailed = createAction(
    '[Mushrooms API] Load Mushrooms Get Request Failed',
    props<{error: any}>()
)

export const createMushroom = createAction(
    '[New Mushroom component] Create Mushroom Request',
    props<Mushroom>()
)

export const createMushroomSucces = createAction(
    '[Mushroom API] Create Mushroom Post Succes',
    props<{mushroom: Mushroom}>()
)

export const createMushroomFailed = createAction(
    '[Mushroom API] Create Mushroom Post Failed',
    props<{error: any}>()
)

export const updateMushroom = createAction(
    '[Mushroom Item component] Update Mushroom Request',
    props<Mushroom>()
)

export const updateMushroomSucces = createAction(
    '[Mushroom API] Update Mushroom Put Request Succes',
    props<{mushroom: Mushroom}>()
)

export const updateMushroomFailed = createAction(
    '[Mushroom API] Update Mushroom Put Request Failed',
    props<{error: any}>()
)

export const deleteMushroom= createAction(
    '[Mushroom Item Component] Delete Mushroom Request',
    props<{id: number }>()
)

export const deleteMushroomSucces = createAction(
    '[Mushroom API] Delete Mushroom Succes',
    props<{id: number}>()
)

export const deleteMushroomFailed = createAction(
    '[Mushroom API] Delete Mushroom Failed',
    props<{error: any}>()
)