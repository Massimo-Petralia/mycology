import { Routes } from '@angular/router';
import { MycologyMushroomListComponent } from './features/mycology/mycology-mushroom-list/mycology-mushroom-list.component';
import { MycologyMushroomEditPageComponent } from './features/mycology/mycology-mushroom-edit-page/mycology-mushroom-edit-page.component';
import { MycologyFormIconographyPageComponent } from './features/mycology/mycology-form-iconography-page/mycology-form-iconography-page.component';
import { MycologyFormMushroomComponent } from './features/mycology/mycology-form-mushroom/mycology-form-mushroom.component';
import { MycologyFormIconographyComponent } from './features/mycology/mycology-form-iconography/mycology-form-iconography.component';
export const routes: Routes = [
    {path: '', redirectTo: 'mushromm-list', pathMatch: 'full'},
    {path: 'mushromm-list', component:MycologyMushroomListComponent},
    {path: 'mushroom-edit-page/:id', component: MycologyMushroomEditPageComponent},
   {path: 'form-iconography-page/:id', component: MycologyFormIconographyPageComponent},
  {path: 'form-mushroom', component: MycologyFormMushroomComponent},
  {path: 'form-iconography', component: MycologyFormIconographyComponent, outlet: 'iconographyoutlet'}
];
