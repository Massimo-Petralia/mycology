import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import {
  MatPaginatorModule,
  PageEvent,
  MatPaginator,
} from '@angular/material/paginator';

@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink, MatPaginatorModule],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<MycologyState>) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  mushrooms$ = this.store.select(selectMushrooms);
  @Input() xtotalcount$!: Observable<number>;
  pageIndex$ = this.store.select(selectPageIndex);

  page: number = 1;
  xtotalcount!: number;
  subs = new Subscription();

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;
    console.log('page from handlePagination: ', this.page);
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
      })
    );
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        console.log("rilevi cambiamento di stato alla creazione dell'undicesimo elemento")
        if (mushrooms.length === 0) {
          this.page = this.page - 1;
          this.store.dispatch(
            MushroomsActions.loadMushrooms({ pageIndex: this.page })
          );
          if (this.paginator) {
            this.paginator.pageIndex = this.paginator.pageIndex - 1;
          }
        };
        
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
//if const  paginator.getNuBER OpAGES === pageIndex => navigate Next page 
