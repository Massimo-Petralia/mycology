import { createReducer, on } from "@ngrx/store";
import { initialState } from "../models/mycology-state.models";
import *as MushroomsActions from "./mycology.actions"


export const mushroomsReducer = createReducer(
    initialState,
    on(MushroomsActions.loadMushroomsSucces, (mycologyState, {mushrooms})=> ({...mycologyState, mushrooms})),
    on(MushroomsActions.createMushroomSucces, (mycologyState, {mushroom})=> ({...mycologyState, mushrooms: [...mycologyState.mushrooms, mushroom]})),
    on(MushroomsActions.updateMushroomSucces, (mycologyState, {mushroom}) => (
      {...mycologyState, mushrooms: [...mycologyState.mushrooms.map((item)=> (item.id !== mushroom.id ? item : mushroom))]} 
    )),
   on(MushroomsActions.deleteMushroomSucces, (mycologyState, {id})=>({...mycologyState, mushrooms: [...mycologyState.mushrooms.filter((item)=> (item.id !== id)  )]}))
)