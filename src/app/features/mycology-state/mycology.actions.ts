import { createAction, props } from "@ngrx/store";
import { Mushroom, IconographyData } from "../models/mushroom.models";

export const loadMushroomsRequest = createAction(
    '[Mushrooms Page] Load Mushromms Request',
    props<{pageIndex: number}>()
)

export const loadMushroomsSucces = createAction(
    '[Mushrooms API] Load Mushrooms Get Request Succes',
    props<{xtotalcount: number, mushrooms: Mushroom[], pageIndex: number}>()
)

export const loadMushroomsFailed = createAction(
    '[Mushrooms API] Load Mushrooms Get Request Failed',
    props<{error: any}>()
)

export const createMushroomRequest = createAction(
    '[New Mushroom component] Create Mushroom Request',
    props<{mushroom:Mushroom, xtotalcount: number, iconographydata: IconographyData}>()
)

export const createMushroomSucces = createAction(
    '[Mushroom API] Create Mushroom Post Succes',
    props<{mushroom: Mushroom, xtotalcount: number}>()
)

export const createMushroomFailed = createAction(
    '[Mushroom API] Create Mushroom Post Failed',
    props<{error: any}>()
)

export const updateMushroomRequest = createAction(
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

export const deleteMushroomRequest= createAction(
    '[Mushroom Item Component] Delete Mushroom Request',
    props<{id: number, xtotalcount: number }>()
)

export const deleteMushroomSucces = createAction(
    '[Mushroom API] Delete Mushroom Succes',
    props<{id: number, xtotalcount: number}>()
)

export const deleteMushroomFailed = createAction(
    '[Mushroom API] Delete Mushroom Failed',
    props<{error: any}>()
)

export const loadIconographyRequest = createAction(
    '[Iconography-list component] Load Iconography Request',
    props<{iconographyID: number}>()
)

export const loadIconographySucces = createAction(
    '[Iconography API]Load Iconography Succes',
    props<{iconographydata: IconographyData}>()
)

export const loadIconographyFailed = createAction(
    '[Iconography API] Load Iconography Failed',
    props<{error: any}>()
)

export const createIconographyRequest = createAction(
    '[Create Mushroom Effects] Create Iconography request',
    props<IconographyData>()
)

export const createIconographySucces = createAction(
    '[Iconography API] Create Iconography Succes',
   // props<{iconographydataID: number}>()
) 

 export const createIconographyFailed = createAction(
    '[Iconography API] Create Iconography Failed'
    )

export const deleteIconographyRequest = createAction(
    '[Delete Mushroom Effects] Delete Iconography Request',
    props<{mushroomID: number}>()

)

export const deleteIconographySucces = createAction(
    '[Iconography API] Delete Iconography Succes',
   // props<{mushroomID: number}>()
)

export const deleteIconographyFailed = createAction(
    '[Iconography API] Delete Iconography Failed',
)