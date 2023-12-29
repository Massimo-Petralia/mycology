import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconographyData } from '../../models/mushroom.models';
import { Iconography } from '../../models/mushroom.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mycology-form-iconography',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mycology-form-iconography.component.html',
  styleUrl: './mycology-form-iconography.component.scss'
})
export class MycologyFormIconographyComponent  {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>
  
 @Input() iconographydata!: IconographyData 

 defineiconography: IconographyData = {iconography:[]}

  @Output() newiconography = new EventEmitter<IconographyData>()

  @Output() oncreate = new EventEmitter()

 @Input() isCreateMode!: boolean 

handleFiles(){
  const imageFiles: FileList|null  = this.inputfileElem.nativeElement.files!
  let counter:  number = 0
  this.iconographydata = {iconography:[]}
  for(const image of Array.from(imageFiles)){
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const imageData = (event.target as FileReader).result as string;
      const iconography = {id: counter++, description: '', imageURL: imageData }
      if(this.isCreateMode === true) {
        this.defineiconography.iconography.push(iconography)
      }else this.iconographydata.iconography.push(iconography)
    }
    reader.readAsDataURL(image)
  }
  console.log('defineiconography', this.defineiconography)
 // this.newiconography.emit(this.defineiconography)
}
// onSave() {

// }
onCreate() {
  this.oncreate.emit()
}
}
