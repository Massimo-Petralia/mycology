import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { MycologyState } from '../../models/mycology-state.models';
import {
  selectMushrooms,
  selectXtotalcount,
  selectPageIndex,
} from '../../mycology-state/mycology.selectors';
import { Observable, Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink, MatPaginatorModule],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<MycologyState>) {}

  mushrooms$ = this.store.select(selectMushrooms);
  @Input() xtotalcount$!: Observable<number>;
  pageIndex$ = this.store.select(selectPageIndex);

  totalPages!: number;
  page: number = 1;
  xtotalcount!: number;
  pageSize!: number;
  subs = new Subscription();

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;
    this.store.dispatch(
      MushroomsActions.loadMushrooms({ pageIndex: this.page })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      MushroomsActions.loadMushrooms({ pageIndex: this.page })
    );
    this.xtotalcount$ = this.store.select(selectXtotalcount);

    this.subs.add(
      this.xtotalcount$.subscribe((xtotal) => {
        this.xtotalcount = xtotal;
        console.log('x total count: ', this.xtotalcount);
      })
    );
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        this.pageSize = mushrooms.length;
      })
    );
  }

  onMushroom(id: number | undefined) {
    this.router.navigate([{ outlets: { container: ['mushroom', id] } }]);
  }

  toNewMushroom() {
    this.router.navigate([{ outlets: { container: ['create-mushroom'] } }]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
