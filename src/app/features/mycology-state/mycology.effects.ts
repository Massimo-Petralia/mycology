import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as MushroomsActions from './mycology.actions';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { Mushroom } from '../models/mushroom.models';
import { response } from 'express';

@Injectable()
export class LoadMushroomsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadMoshrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.loadMushrooms),
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

  createMushroom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MushroomsActions.createMushroom),
        exhaustMap((request) =>
          this.dataService.createMushroom(request.mushroom).pipe(
            map((mushromm) =>
              MushroomsActions.createMushroomSucces({
                mushroom: mushromm,
                xtotalcount: request.xtotalcount,
              })
            ),

            catchError((error) =>
              of(MushroomsActions.createMushroomFailed({ error }))
            )
          )
        )
      ),
  );
}

@Injectable()
export class updateMushroomEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  updateMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.updateMushroom),
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
      ofType(MushroomsActions.deleteMushroom),

      exhaustMap((request) =>
        this.dataService.deleteMushroom(request.id).pipe(
          map(() => request),
          map((request) => MushroomsActions.deleteMushroomSucces({id: request.id, xtotalcount: request.xtotalcount })),

          catchError((error) =>
            of(MushroomsActions.deleteMushroomFailed({ error }))
          )
        )
      )
    )
  );
}

// this.dataService.getXtotalcount().pipe(
//   exhaustMap( (response) => MushroomsActions.sendDati({
//     xtotalcount:  Number(response.headers.get('X-total-count'))
//   })
//   )
//   )
