import { Component, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import {MatTableModule, MatTable} from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { selectPageIndex } from '../../mycology-state/mycology.selectors';

import { FormsModule } from '@angular/forms';
import { Mushroom } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-mushroom-table',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatTableModule, RouterLink, FormsModule, MatButtonModule],
  templateUrl: './mycology-mushroom-table.component.html',
  styleUrl: './mycology-mushroom-table.component.scss',
})
export class MycologyMushroomTableComponent   {
  constructor(private router: Router, private store: Store<MycologyState>) {}
  @ViewChild(MatTable) table! : MatTable<Mushroom>

  columsToDisplay = ['species', 'gender', 'family', 'order', 'AA']

  @Input() mushrooms: Mushroom[] = [];

  //pageIndex$ = this.store.select(selectPageIndex);
  
  @Input() page!: number;

  showFirstLastButtons: boolean = true;



  onMushroom(id: number) {
    this.router.navigate(['mushroom', this.page, id]);
  }

  toCreateMushroom() {
    this.router.navigate(['form-mushroom', this.page]);
  }
}
