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

@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<MycologyState>) {}

  mushrooms$ = this.store.select(selectMushrooms);
  @Input() xtotalcount$!: Observable<number>;
  pageIndex$ = this.store.select(selectPageIndex);

  totalPages!: number;
  pageIndex: number = 1;
  xtotalcount!: number;
  pageSize!: number;
  subs = new Subscription();

  isPrevDisabled!: boolean;
  isNextDisabled!: boolean;

  onNextPage() {
    this.pageIndex = this.pageIndex + 1;
    this.totalPages = Math.ceil(this.xtotalcount / this.pageSize);
    if (this.pageIndex > 1) this.isPrevDisabled = false;
    if (this.pageIndex === this.totalPages) this.isNextDisabled = true;
    this.store.dispatch(
      MushroomsActions.loadMushrooms({ pageIndex: this.pageIndex })
    );
  }
  onPrevPage() {
    this.pageIndex = this.pageIndex - 1;
    if (this.pageIndex === 1) {
      this.isPrevDisabled = true;
      this.isNextDisabled = false;
    }
    this.store.dispatch(
      MushroomsActions.loadMushrooms({ pageIndex: this.pageIndex })
    );
  }

  ngOnInit(): void {
    this.isPrevDisabled = true;
    this.store.dispatch(
      MushroomsActions.loadMushrooms({ pageIndex: this.pageIndex })
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
