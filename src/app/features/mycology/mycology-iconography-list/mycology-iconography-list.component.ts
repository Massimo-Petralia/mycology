import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mycology-iconography-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mycology-iconography-list.component.html',
  styleUrl: './mycology-iconography-list.component.scss'
})
export class MycologyIconographyListComponent {
@Input()  iconographyID!: number
}
