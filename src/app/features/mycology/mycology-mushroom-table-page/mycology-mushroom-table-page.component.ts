import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
} from '@angular/core';
import { MycologyMushroomTableComponent } from '../mycology-mushroom-table/mycology-mushroom-table.component';
import { Store } from '@ngrx/store';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import {
  selectMushrooms,
  selectXtotalcount,
} from '../../mycology-state/mycology.selectors';
import { Subscription, Observable } from 'rxjs';
import { Mushroom } from '../../models/mushroom.models';
import {
  MatPaginatorModule,
  PageEvent,
  MatPaginator,
} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mycology-mushroom-table-page',
  standalone: true,
  imports: [
    MycologyMushroomTableComponent,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
  ],
  templateUrl: './mycology-mushroom-table-page.component.html',
  styleUrl: './mycology-mushroom-table-page.component.scss',
})
export class MycologyMushroomTablePageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private store: Store, private router: Router) {}
  @ViewChild('paginator') paginator!: MatPaginator;
  showFirstLastButtons: boolean = true;

  mushrooms$ = this.store.select(selectMushrooms);
  mushrooms: Mushroom[] = [];
  xtotalcount$!: Observable<number>;
  xtotalcount!: number;
  subs = new Subscription();
  @Input() set currentpage(pagenumber: number) {
    if (pagenumber !== 1) {
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

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex + 1;
    this.store.dispatch(
      MushroomsActions.loadMushroomsRequest({ pageIndex: this.page })
    );
    this.router.navigate(['mushrooms', this.page]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
