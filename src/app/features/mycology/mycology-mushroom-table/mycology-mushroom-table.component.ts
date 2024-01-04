import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import { selectPageIndex } from '../../mycology-state/mycology.selectors';

import { FormsModule } from '@angular/forms';
import { Mushroom } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterLink, FormsModule],
  templateUrl: './mycology-mushroom-table.component.html',
  styleUrl: './mycology-mushroom-table.component.scss',
})
export class MycologyMushroomTableComponent {
  constructor(private router: Router, private store: Store<MycologyState>) {}

  @Input() mushrooms: Mushroom[] = [];

  //pageIndex$ = this.store.select(selectPageIndex);
  
  @Input() page!: number;
  @Input() xtotalcount!: number;

  showFirstLastButtons: boolean = true;

  onMushroom(id: number) {
    this.router.navigate(['mushroom', this.page, id]);
  }

  toCreateMushroom() {
    this.router.navigate(['form-mushroom']);
  }
}
