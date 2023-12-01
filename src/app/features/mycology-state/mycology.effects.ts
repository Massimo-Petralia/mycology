import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as MushroomsActions from './mycology.actions';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { Mushroom } from '../models/mushroom.models';

@Injectable()
export class LoadMushroomsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadMoshrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MushroomsActions.loadMushrooms),
      exhaustMap(() =>
        this.dataService.getMushrooms().pipe(
          map((mushrooms: Mushroom[]) =>
            MushroomsActions.loadMushroomsSucces({ mushrooms })
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
      ofType(MushroomsActions.createMushroom),
      exhaustMap((mushroom) =>
        this.dataService.createMushroom(mushroom).pipe(
          map((mushroom: Mushroom) =>
            MushroomsActions.createMushroomSucces({ mushroom })
          ),
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

      exhaustMap((idNumber) =>
        this.dataService.deleteMushroom(idNumber.id).pipe(
          map(() => idNumber),
          map((idNumber) => MushroomsActions.deleteMushroomSucces(idNumber)),

          catchError((error) =>
            of(MushroomsActions.deleteMushroomFailed({ error }))
          )
        )
      )
    )
  );
}
