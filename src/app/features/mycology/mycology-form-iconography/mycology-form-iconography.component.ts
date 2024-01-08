import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconographyData } from '../../models/mushroom.models';
import { Iconography } from '../../models/mushroom.models';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
  FormArray,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mycology-form-iconography',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    TextFieldModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './mycology-form-iconography.component.html',
  styleUrl: './mycology-form-iconography.component.scss',
})
export class MycologyFormIconographyComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder) {}
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;

  @Input() iconographydata: IconographyData  = { iconographyarray: [] };

  //defineiconography: IconographyData = { iconographyarray: [] };

  @Output() oncreate = new EventEmitter();

  @Output() update = new EventEmitter<IconographyData>();

  @Input() isCreateMode!: boolean;

  formIconographyData = this.formBuilder.group({
    id: <number | undefined>0,
    mushroomID: <number | undefined>0,
    iconographyarrayform: this.formBuilder.array([]),
  });

  get iconographyarrayform() {
    return this.formIconographyData.get(
      'iconographyarrayform'
    ) as unknown as FormArray;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('iconographydata ngOnChanges: ', this.iconographydata)
    if (this.iconographydata) {
      this.isCreateMode = false;
      this.formIconographyData.controls.iconographyarrayform.clear();

      this.iconographydata.iconographyarray.forEach((iconography) => {
        this.iconographyarrayform.push(
          this.formBuilder.control<string>(iconography.description)
        );
      });
      this.formIconographyData.patchValue(this.iconographydata);
    }
  }

  handleFiles() {
    const imageFiles: FileList | null = this.inputfileElem.nativeElement.files;
    let counter: number = 0
    if (imageFiles) {
      for (const image of Array.from(imageFiles)) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const imageData = (event.target as FileReader).result as string;

          const iconography: Iconography = {
            id:  (this.iconographydata.iconographyarray.length == 0 ? 0 : this.iconographydata.iconographyarray.length+1),
            description: '',
            imageURL: imageData,
          };
      
         
            const iconographydata = {
              ...this.iconographydata,
              iconographyarray: [
                ...this.iconographydata.iconographyarray,
                iconography,
              ],
            };

            this.iconographydata = iconographydata;
            this.iconographyarrayform.push(
              this.formBuilder.control<string>(iconography.description)
            );
          
        };
        reader.readAsDataURL(image);
      }
    }
   
  }

  onSubmit() {
    const mappedIconographyarray = (
      this.formIconographyData.controls.iconographyarrayform.value as string[]
    ).map((text) => ({ description: text }));
    const mappedIconographydata = {
      ...this.iconographydata,
      iconographyarray: [
        ...this.iconographydata.iconographyarray.map(
          (iconography, index) =>
            (iconography = {
              ...this.iconographydata.iconographyarray[index],
              description: mappedIconographyarray[index].description,
            })
        ),
      ],
    };
    this.update.emit(mappedIconographydata);
  }

  onCreate() {
    const mappedIconographyarray = (
      this.formIconographyData.controls.iconographyarrayform.value as string[]
    ).map((text) => ({ description: text }));
    const mappedIconographydata = {
      ...this.iconographydata,
      iconographyarray: [
        ...this.iconographydata.iconographyarray.map(
          (iconography, index) =>
            (iconography = {
              ...this.iconographydata.iconographyarray[index],
              description: mappedIconographyarray[index].description,
            })
        ),
      ],
    };
    this.iconographydata = mappedIconographydata
    this.oncreate.emit();
  }

  removeControl(index: number, iconographyID: number) {
    this.formIconographyData.controls.iconographyarrayform.removeAt(index);
    this.iconographydata = {...this.iconographydata, iconographyarray: this.iconographydata.iconographyarray.filter(iconography=>
       iconography.id !== iconographyID 
       
    )}
  }

}
