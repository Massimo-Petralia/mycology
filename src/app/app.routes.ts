import { Routes } from '@angular/router';
import { MycologyMushroomTablePageComponent } from './features/mycology/mycology-mushroom-table-page/mycology-mushroom-table-page.component';
import { MycologyMushroomPageComponent } from './features/mycology/mycology-mushroom-page/mycology-mushroom-page.component';
import { MycologyFormIconographyPageComponent } from './features/mycology/mycology-form-iconography-page/mycology-form-iconography-page.component';
import { MycologyFormMushroomComponent } from './features/mycology/mycology-form-mushroom/mycology-form-mushroom.component';
import { MycologyFormIconographyComponent } from './features/mycology/mycology-form-iconography/mycology-form-iconography.component';
export const routes: Routes = [
  { path: '', redirectTo: `mushrooms/${1}`, pathMatch: 'full'},
  { path: 'mushrooms/:currentpage', component: MycologyMushroomTablePageComponent },
  {
    path: 'mushroom/:currentpage/:id',
    component: MycologyMushroomPageComponent,
  },
  {
    path: 'iconography/:id',
    component: MycologyFormIconographyPageComponent,
  },
  { path: 'form-mushroom', component: MycologyFormMushroomComponent },
  { path: 'form-iconography', component: MycologyFormIconographyComponent },
];
