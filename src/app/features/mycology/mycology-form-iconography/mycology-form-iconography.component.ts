import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconographyData } from '../../models/mushroom.models';
import { Iconography } from '../../models/mushroom.models';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  FormArray,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mycology-form-iconography',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mycology-form-iconography.component.html',
  styleUrl: './mycology-form-iconography.component.scss',
})
export class MycologyFormIconographyComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  constructor(private formBuilder: FormBuilder) {}
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;

  @Input() iconographydata!: IconographyData;

  defineiconography: IconographyData = { iconographyarray: [] };

  @Output() newiconography = new EventEmitter<IconographyData>();

  @Output() oncreate = new EventEmitter();

  @Output() update = new EventEmitter<IconographyData>();

  @Input() isCreateMode!: boolean;

  formIconographyData = this.formBuilder.group({
    id: <number | undefined>0, //questo controllo fa riferimento a una proprietà facoltativa quindi non dovrebbe essere necessario definirlo
    mushroomID: <number | undefined>0, //questo controllo fa riferimento a una proprietà facoltativa quindi non dovrebbe essere necessario definirlo
    iconographyarrayform: this.formBuilder.array([]),
  });

  get iconographyarrayform() {
    return this.formIconographyData.get(
      'iconographyarrayform'
    ) as unknown as FormArray;
  }

  ngOnInit(): void {
    this.formIconographyData.controls.iconographyarrayform.patchValue([]);

    this.iconographydata.iconographyarray.forEach((iconography) => {
      this.iconographyarrayform.push(
        this.formBuilder.control<string>(iconography.description)
      );
    });
    console.log('valore completo del form: ', this.formIconographyData.value);
    this.formIconographyData.patchValue(this.iconographydata);
    console.log('check di mushroomID e ID all onInit', this.iconographydata);
  }

  ngAfterViewInit(): void {}

  @Output() formvalue = new EventEmitter<IconographyData>();

  ngOnChanges(changes: SimpleChanges): void {
    // const {iconographydata} = changes
    // if(iconographydata) {
    // }
  }

  // handleFiles() {
  //     const imageFiles: FileList | null = this.inputfileElem.nativeElement.files;
  //     let counter: number = 0;
  //     this.iconographydata = { iconographyarray: [] };
  //     if (imageFiles) {
  //       for (const image of Array.from(imageFiles)) {
  //         const reader = new FileReader();
  //         reader.onload = (event: ProgressEvent<FileReader>) => {
  //           const imageData = (event.target as FileReader).result as string;

  //           const iconography: Iconography = {
  //             id: counter++,
  //             description: '',
  //             imageURL: imageData,
  //           };
  //           if (this.isCreateMode === true) {
  //             this.defineiconography.iconographyarray = [
  //               ...this.defineiconography.iconographyarray,
  //               iconography,
  //             ];
  //           } else {
  //             this.iconographydata.iconographyarray = [
  //               ...this.iconographydata.iconographyarray,
  //               iconography,
  //             ];
  //           }
  //         };
  //         reader.readAsDataURL(image);
  //       }
  //     }
  //   }

  onSubmit() {
    //this.formvalue.emit(this.formIconographyData.value) emit current form value
  }

  onCreate() {
    this.oncreate.emit();
  }

  onUpdate() {
    //emettere iconographydata
    console.log('valore corrente di iconography data: ', this.iconographydata);
  }

  ngOnDestroy(): void {}
}