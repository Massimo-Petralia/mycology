import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconographyData } from '../../models/mushroom.models';
import { Iconography } from '../../models/mushroom.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mycology-new-iconography',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mycology-new-iconography.component.html',
  styleUrl: './mycology-new-iconography.component.scss'
})
export class MycologyNewIconographyComponent {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>
  

//@Output() iconographydata$ = new EventEmitter<IconographyData>()


iconographylist: Iconography[] =[]

handleFiles(){
  const imageFiles: FileList|null  = this.inputfileElem.nativeElement.files!
  let counter:  number = 0
  for(const image of Array.from(imageFiles)){
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const imageData = (event.target as FileReader).result as string;
      const iconography = {id: counter++, description: '', imageURL: imageData }
      this.iconographylist.push(iconography)
    }
    reader.readAsDataURL(image)
  }
}

getIconographylist(){
  console.log('iconography obj preview: ', this.iconographylist)

}
}
