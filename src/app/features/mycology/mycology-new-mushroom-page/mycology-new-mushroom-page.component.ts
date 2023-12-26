import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MycologyFormMushroomComponent } from '../mycology-form-mushroom/mycology-form-mushroom.component';

@Component({
  selector: 'app-mycology-new-mushroom-page',
  standalone: true,
  imports: [CommonModule, MycologyFormMushroomComponent],
  templateUrl: './mycology-new-mushroom-page.component.html',
  styleUrl: './mycology-new-mushroom-page.component.scss'
})
export class MycologyNewMushroomPageComponent {

}
