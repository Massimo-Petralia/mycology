import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterLink,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private router: Router, private store: Store<MycologyState>) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  mushrooms$ = this.store.select(selectMushrooms);

  @Input() xtotalcount$!: Observable<number>;

  pageIndex$ = this.store.select(selectPageIndex);
  page: number = 1;
  xtotalcount!: number;

  showFirstLastButtons: boolean = true;

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
      })
    );
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        if (mushrooms.length === 0) {
          this.page = this.page - 1;
          this.store.dispatch(
            MushroomsActions.loadMushrooms({ pageIndex: this.page })
          );

          this.paginator!.pageIndex = this.paginator.pageIndex - 1;
        }
      })
    );
  }

  onMushroom(id: number) {
    this.router.navigate([{ outlets: { container: ['mushroom', id] } }]);
  }

  toNewMushroom() {
    this.router.navigate([{ outlets: { container: ['create-mushroom'] } }]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
