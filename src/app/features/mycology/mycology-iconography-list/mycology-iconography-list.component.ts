import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MushroomsActions from '../../mycology-state/mycology.actions'
import { selectIconographydata } from '../../mycology-state/mycology.selectors';
import { Subscription } from 'rxjs';
import { Iconography } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-iconography-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mycology-iconography-list.component.html',
  styleUrl: './mycology-iconography-list.component.scss'
})
export class MycologyIconographyListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<MycologyState>){}
@Input()  iconographyID!: number
iconographydata$ = this.store.select(selectIconographydata)
subs = new Subscription()
iconography: Iconography[] = []
ngOnInit(): void {
  this.store.dispatch(MushroomsActions.loadIconography({iconographyID : this.iconographyID}))
  this.subs.add(
    this.iconographydata$.subscribe((iconographydata)=>{
      this.iconography = iconographydata.iconography
      console.log('iconographydata from subscription: ', iconographydata)
    })
  )
}
ngOnDestroy(): void {
  this.subs.unsubscribe()
}
}
