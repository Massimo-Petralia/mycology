import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mushroom } from '../../models/mushroom.models';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import *as MushroomsActions from '../../mycology-state/mycology.actions';
import { MycologyState } from '../../models/mycology-state.models';
import { selectMushrooms } from '../../mycology-state/mycology.selectors';

@Component({
  selector: 'app-mycology-mushroom-list',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink],
  templateUrl: './mycology-mushroom-list.component.html',
  styleUrl: './mycology-mushroom-list.component.scss',
})
export class MycologyMushroomListComponent implements OnInit{
  constructor(private router: Router, private store: Store<MycologyState>) {}

  mushrooms$ = this.store.select(selectMushrooms);


  ngOnInit(): void {
    this.store.dispatch(MushroomsActions.loadMushrooms());
  }


  onMushroom(id: number | undefined) {
    this.router.navigate([{outlets: {container: ['mushroom', id]}} ]);

  }

  toNewMushroom() {
    this.router.navigate([{outlets: {container: ['create-mushroom']}}])
  }
}
