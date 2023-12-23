import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconographyData } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-new-iconography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mycology-new-iconography.component.html',
  styleUrl: './mycology-new-iconography.component.scss'
})
export class MycologyNewIconographyComponent {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>

@Output() iconographydata = new EventEmitter<IconographyData>()

handleFiles(){}
}
