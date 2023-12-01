import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { mushroomsReducer } from './features/mycology-state/mycology.reducers'
import { LoadMushroomsEffects, CreateMushroomEffects, updateMushroomEffects, deleteMushroomEffects } from './features/mycology-state/mycology.effects';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(
    withFetch()
  ),
  provideStore({mycology: mushroomsReducer}), 
  provideEffects([LoadMushroomsEffects, CreateMushroomEffects, updateMushroomEffects, deleteMushroomEffects]), 
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimations()]
  
};
