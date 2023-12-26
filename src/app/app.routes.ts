import { Routes } from '@angular/router';
import { MycologyMushroomEditComponent } from './features/mycology/mycology-mushroom-edit/mycology-mushroom-edit.component';
import { MycologyNewMushroomComponent } from './features/mycology/mycology-new-mushroom/mycology-new-mushroom.component';
import { MycologyMushroomListComponent } from './features/mycology/mycology-mushroom-list/mycology-mushroom-list.component';
export const routes: Routes = [
    {path: '', redirectTo: 'mushromm-list', pathMatch: 'full'},
    {path: 'mushromm-list', component:MycologyMushroomListComponent},

    {path: 'mushroom/:id', component: MycologyMushroomEditComponent },
    {path: 'create-mushroom', component: MycologyNewMushroomComponent}
];
