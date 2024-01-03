import { Component, OnInit } from '@angular/core';
import { MycologyMushroomTableComponent } from '../mycology-mushroom-table/mycology-mushroom-table.component';
import { Store } from '@ngrx/store';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { selectMushrooms } from '../../mycology-state/mycology.selectors';
@Component({
  selector: 'app-mycology-mushroom-table-page',
  standalone: true,
  imports: [MycologyMushroomTableComponent],
  templateUrl: './mycology-mushroom-table-page.component.html',
  styleUrl: './mycology-mushroom-table-page.component.scss'
})
export class MycologyMushroomTablePageComponent implements OnInit {
  constructor(private store: Store){}
 // mushrooms$ = this.store.select(selectMushrooms);

page: number = 1

ngOnInit(): void {
  // this.store.dispatch(
  //   MushroomsActions.loadMushroomsRequest({ pageIndex: this.page })
  // );
}
}
