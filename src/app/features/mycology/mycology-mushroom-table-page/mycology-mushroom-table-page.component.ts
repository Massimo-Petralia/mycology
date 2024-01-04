import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MycologyMushroomTableComponent } from '../mycology-mushroom-table/mycology-mushroom-table.component';
import { Store } from '@ngrx/store';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { selectMushrooms } from '../../mycology-state/mycology.selectors';
import { Subscription } from 'rxjs';
import { Mushroom } from '../../models/mushroom.models';
@Component({
  selector: 'app-mycology-mushroom-table-page',
  standalone: true,
  imports: [MycologyMushroomTableComponent],
  templateUrl: './mycology-mushroom-table-page.component.html',
  styleUrl: './mycology-mushroom-table-page.component.scss',
})
export class MycologyMushroomTablePageComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  mushrooms$ = this.store.select(selectMushrooms);
  mushrooms: Mushroom[] = [];
  subs = new Subscription();
  @Input() set currentpage(pagenumber: number) {
    if (pagenumber) {
      this.page = pagenumber;
    }
  }

  page: number = 1;

  ngOnInit(): void {
    this.store.dispatch(
      MushroomsActions.loadMushroomsRequest({ pageIndex: this.page })
    );
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        this.mushrooms = mushrooms;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
