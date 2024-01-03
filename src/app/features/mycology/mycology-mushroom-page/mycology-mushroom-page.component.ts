import {
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mushroom } from '../../models/mushroom.models';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MycologyFormMushroomComponent } from '../mycology-form-mushroom/mycology-form-mushroom.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { Router } from '@angular/router';
import { selectXtotalcount } from '../../mycology-state/mycology.selectors';

@Component({
  selector: 'app-mycology-mushroom-page',
  standalone: true,
  imports: [CommonModule, MycologyFormMushroomComponent],
  templateUrl: './mycology-mushroom-page.component.html',
  styleUrl: './mycology-mushroom-page.component.scss',
})
export class MycologyMushroomPageComponent
  implements OnInit, OnChanges, OnDestroy
{
  constructor(
    private dataService: DataService,
    private store: Store<MycologyState>,
    private router: Router
  ) {}

isCreateMode!: boolean

  @Input() set id(mushroomId: number) {
    this.mushroomID = mushroomId;
  }
  mushroomID!: number;
  mushroom!: Mushroom;
  subs = new Subscription();

  xtotalcount$ = this.store.select(selectXtotalcount);
  xtotalcount!: number;

  ngOnInit(): void {
    this.subs.add(
      this.xtotalcount$.subscribe((xtotal) => {
        this.xtotalcount = xtotal;
      })
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if (id) {
      this.subs.add(
        this.dataService.getMushroom(this.mushroomID).subscribe((mushroom) => {
          this.mushroom = mushroom;
        })
      );
    }
  }
  onUpdate(mushroom: Mushroom) {
    this.store.dispatch(
      MushroomsActions.updateMushroomRequest({
        ...mushroom,
        id: this.mushroomID,
      })
    );
  }

  onDelete(id: number) {
    this.xtotalcount = this.xtotalcount - 1;
    this.store.dispatch(
      MushroomsActions.deleteMushroomRequest({
        id: id,
        xtotalcount: this.xtotalcount,
      })
    );
    this.router.navigate(['mushrooms']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
