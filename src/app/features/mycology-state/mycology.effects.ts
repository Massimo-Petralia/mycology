import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as MushroomsActions from './mycology.actions';
import { map, exhaustMap, catchError, of, switchMap, from } from 'rxjs';
import { IconographyData, Mushroom } from '../models/mushroom.models';
import { Store } from '@ngrx/store';
import { response } from 'express';
import { request } from 'http';

@Injectable()
export class LoadMushroomsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadMoshrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.loadMushroomsRequest),
      exhaustMap((page) =>
        this.dataService.getMushrooms(page.pageIndex).pipe(
          map((response) =>
            MushroomsActions.loadMushroomsSucces({
              xtotalcount: Number(response.headers.get('X-total-count')),
              mushrooms: response.body!,
              pageIndex: page.pageIndex,
            })
          ),
          catchError((error) =>
            of(MushroomsActions.loadMushroomsFailed({ error }))
          )
        )
      )
    )
  );
}

@Injectable()
export class CreateMushroomEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  createMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.createMushroomRequest),
      exhaustMap((request) =>
        this.dataService.createMushroom(request.mushroom).pipe(
          switchMap((mushroom) => {
            const actionsToDispatch = [
              MushroomsActions.createMushroomSucces({
                mushroom: mushroom,
                xtotalcount: request.xtotalcount,
              }),
              MushroomsActions.createIconographyRequest({
                ...request.iconographydata,
                id: mushroom.id,
              }),
            ];
            return from(actionsToDispatch);
          }),

          catchError((error) =>
            of(MushroomsActions.createMushroomFailed({ error }))
          )
        )
      )
    )
  );
}

@Injectable()
export class updateMushroomEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  updateMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.updateMushroomRequest),
      exhaustMap((mushroom) =>
        this.dataService.updateMushroom(mushroom).pipe(
          map((mushroom: Mushroom) =>
            MushroomsActions.updateMushroomSucces({ mushroom })
          ),
          catchError((error) =>
            of(MushroomsActions.updateMushroomFailed({ error }))
          )
        )
      )
    )
  );
}

@Injectable()
export class deleteMushroomEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  deleteMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.deleteMushroomRequest),

      exhaustMap((request) =>
        this.dataService.deleteMushroom(request.id).pipe(
          map(() => request),
          map((request) =>
            MushroomsActions.deleteMushroomSucces({
              id: request.id,
              xtotalcount: request.xtotalcount,
            })
          ),

          catchError((error) =>
            of(MushroomsActions.deleteMushroomFailed({ error }))
          )
        )
      )
    )
  );
}

@Injectable()
export class LoadIconographyEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.loadIconographyRequest),
      switchMap((prop) =>
        this.dataService.getIconography(prop.iconographyID).pipe(
          map((iconographydata: IconographyData) =>
            MushroomsActions.loadIconographySucces({ iconographydata })
          ),
          catchError((error) =>
            of(MushroomsActions.loadIconographyFailed({ error }))
          )
        )
      )
    )
  );
}

@Injectable()
export class CreateIconographyEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}
  createIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.createIconographyRequest),
      switchMap((iconographydata) =>
        this.dataService.createIconography(iconographydata).pipe(
          map((iconographydata) =>
            MushroomsActions.createIconographySucces({
              iconographydataID: iconographydata.id!,
            })
          )
        )
      )
    )
  );
}
