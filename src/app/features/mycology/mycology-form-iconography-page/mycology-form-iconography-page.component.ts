import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MycologyFormIconographyComponent } from '../mycology-form-iconography/mycology-form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MycologyActions from '../../mycology-state/mycology.actions';
import { selectIconographydata } from '../../mycology-state/mycology.selectors';
import { Subscription } from 'rxjs';
import { IconographyData } from '../../models/mushroom.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycology-form-iconography-page',
  standalone: true,
  imports: [CommonModule, MycologyFormIconographyComponent],
  templateUrl: './mycology-form-iconography-page.component.html',
  styleUrl: './mycology-form-iconography-page.component.scss',
})
export class MycologyFormIconographyPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store<MycologyState>, private router: Router) {}


  @Input() set id(mushroomId: number) {
    this.mushroomID = mushroomId;
  }

  mushroomID!: number;

  subs = new Subscription();

  iconographydata!: IconographyData;

  iconographydata$ = this.store.select(selectIconographydata);

  isCreateMode!: boolean

  ngOnInit(): void {
    this.store.dispatch(
      MycologyActions.loadIconographyRequest({ iconographyID: this.mushroomID })
    );
    this.subs.add(
      this.iconographydata$.subscribe((iconographydata) => {
        this.iconographydata = iconographydata;
      })
    );
  }
  onUpdate(iconographydata: IconographyData) {
    this.store.dispatch(
      MycologyActions.updateIconographyRequest({
        ...iconographydata,
        id: this.mushroomID,
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
