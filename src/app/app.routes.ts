import { Routes } from '@angular/router';
import { MycologyMushroomEditComponent } from './features/mycology/mycology-mushroom-edit/mycology-mushroom-edit.component';
import { MycologyFormMushroomComponent } from './features/mycology/mycology-form-mushroom/mycology-form-mushroom.component';
import { MycologyMushroomListComponent } from './features/mycology/mycology-mushroom-list/mycology-mushroom-list.component';
import { MycologyMushroomEditPageComponent } from './features/mycology/mycology-mushroom-edit-page/mycology-mushroom-edit-page.component';
import { MycologyNewMushroomPageComponent } from './features/mycology/mycology-new-mushroom-page/mycology-new-mushroom-page.component';
export const routes: Routes = [
    {path: '', redirectTo: 'mushromm-list', pathMatch: 'full'},
    {path: 'mushromm-list', component:MycologyMushroomListComponent},
    {path: 'mushroom-edit-page/:id', component: MycologyMushroomEditPageComponent},
    //{path: 'mushroom/:id', component: MycologyMushroomEditComponent },
    {path: 'new-mushroom-page', component: MycologyNewMushroomPageComponent},
   // {path: 'create-mushroom', component: MycologyFormMushroomComponent}
];
