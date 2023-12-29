import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MycologyFormMushroomComponent } from '../mycology-form-mushroom/mycology-form-mushroom.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';

@Component({
  selector: 'app-mycology-new-mushroom-page',
  standalone: true,
  imports: [CommonModule, MycologyFormMushroomComponent],
  templateUrl: './mycology-new-mushroom-page.component.html',
  styleUrl: './mycology-new-mushroom-page.component.scss'
})
export class MycologyNewMushroomPageComponent {
  constructor(private store: Store<MycologyState>){}
}
