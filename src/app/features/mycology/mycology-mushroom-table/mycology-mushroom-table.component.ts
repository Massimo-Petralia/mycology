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
import { Mushroom } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-mushroom-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterLink,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './mycology-mushroom-table.component.html',
  styleUrl: './mycology-mushroom-table.component.scss',
})
export class MycologyMushroomTableComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  constructor(private router: Router, private store: Store<MycologyState>) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() mushrooms: Mushroom[] = [];

  @Input() xtotalcount$!: Observable<number>;

  pageIndex$ = this.store.select(selectPageIndex);
  @Input() page!: number;
  xtotalcount!: number;

  showFirstLastButtons: boolean = true;

  subs = new Subscription();

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;
    this.store.dispatch(
      MushroomsActions.loadMushroomsRequest({ pageIndex: this.page })
    );
  }

  ngOnInit(): void {
    this.xtotalcount$ = this.store.select(selectXtotalcount);

    this.subs.add(
      this.xtotalcount$.subscribe((xtotal) => {
        this.xtotalcount = xtotal;
      })
    );
  }
  ngAfterViewInit(): void {
    if (this.page !== 1) {
      this.paginator.pageIndex = this.page - 1;
    }
  }
  onMushroom(id: number) {
    this.router.navigate(['mushroom', this.page, id]);
  }

  toNewMushroom() {
    //
    this.router.navigate(['form-mushroom']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
