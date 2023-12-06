import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mushroom } from '../../models/mushroom.models';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import *as MushroomsActions from '../../mycology-state/mycology.actions';
import { MycologyState } from '../../models/mycology-state.models';
import { selectMushrooms, selectXtotalcount, selectPageIndex } from '../../mycology-state/mycology.selectors';
import { Observable, Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'


@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink, MatPaginatorModule],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private store: Store<MycologyState>) {}

mushrooms$ = this.store.select(selectMushrooms);
@Input() xtotalcount$ ! : Observable<number>
pageIndex$ = this.store.select(selectPageIndex)

pageIndex: number = 0
xtotalcount: number = 0
subs = new Subscription()


handlePageEvent(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.xtotalcount = event.length
}
  ngOnInit(): void {
    this.store.dispatch(MushroomsActions.loadMushrooms({pageIndex: this.pageIndex}));
    this.xtotalcount$ = this.store.select(selectXtotalcount);
    console.log('initial: x total count: ', this.xtotalcount)
    this.subs = this.xtotalcount$.subscribe((xtotal)=> {
      this.xtotalcount = xtotal
      console.log('new x total count: ', this.xtotalcount)
    })
    
  }
  


  onMushroom(id: number | undefined) {
    this.router.navigate([{outlets: {container: ['mushroom', id]}} ]);

  }

  toNewMushroom() {
    this.router.navigate([{outlets: {container: ['create-mushroom']}}])
  }

  ngOnDestroy(): void {
   
    this.subs.unsubscribe()
  }
}

