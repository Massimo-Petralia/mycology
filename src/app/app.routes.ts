import { Routes } from '@angular/router';
import { MycologyMushroomItemComponent } from './features/mycology/mycology-mushroom-item/mycology-mushroom-item.component';
import { MycologyNewMushroomComponent } from './features/mycology/mycology-new-mushroom/mycology-new-mushroom.component';
import { MycologyMushroomListComponent } from './features/mycology/mycology-mushroom-list/mycology-mushroom-list.component';
export const routes: Routes = [
    {path: '', redirectTo: 'mushromm-list', pathMatch: 'full'},
    {path: 'mushromm-list', component:MycologyMushroomListComponent},

    {path: 'mushroom/:id', component: MycologyMushroomItemComponent, outlet: "container" },
    {path: 'create-mushroom', component: MycologyNewMushroomComponent, outlet: "container"}
];
