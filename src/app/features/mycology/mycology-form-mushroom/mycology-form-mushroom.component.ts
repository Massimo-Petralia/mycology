import { Component, Input, OnInit,OnChanges, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { selectPageIndex, selectXtotalcount } from '../../mycology-state/mycology.selectors'; 
import { Subscription } from 'rxjs';
import { MycologyFormIconographyComponent } from '../mycology-form-iconography/mycology-form-iconography.component';
import { IconographyData, Mushroom } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-form-mushroom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MycologyFormIconographyComponent
  ],
  templateUrl: './mycology-form-mushroom.component.html',
  styleUrl: './mycology-form-mushroom.component.scss',
})
export class MycologyFormMushroomComponent implements OnInit , OnChanges{
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MycologyState>,
    private router: Router,
    private http: HttpClient
  ) {}

@Input() mushroom! : Mushroom
@Output() update = new EventEmitter<Mushroom>()

  @ViewChild(MycologyFormIconographyComponent) iconography!: MycologyFormIconographyComponent
  pageIndex$ = this.store.select(selectPageIndex);
  xtotalcount$ = this.store.select(selectXtotalcount) ;
  subs = new Subscription()
  iconographydata!: IconographyData
  xtotalcount!: number //counter dovrebbe essere assegnato al pezzo di stato xtotalcount tramite un selettore
ngOnInit(): void {
  this.subs = this.xtotalcount$.subscribe((xtotal)=> {
    this.xtotalcount = xtotal
  })
}

ngOnChanges(changes: SimpleChanges): void {
  const {mushroom} = changes
  if(mushroom) {
    this.mushroomForm.patchValue(this.mushroom)
  }
}

  mushroomForm: FormGroup = this.formBuilder.group({
    taxonomy: this.formBuilder.group({
      AA: this.formBuilder.control<string>(''),
      species: this.formBuilder.control<string>('', Validators.required),
      gender: this.formBuilder.control<string>(''),
      family: this.formBuilder.control<string>(''),
      order: this.formBuilder.control<string>(''),
      synonymous: this.formBuilder.control<string>(''),
    }),

    morphology: this.formBuilder.group({
      cap: this.formBuilder.control<string>(''),
      gills: this.formBuilder.control<string>(''),
      stalk: this.formBuilder.control<string>(''),
      flesh: this.formBuilder.control<string>(''),
    }),
    features: this.formBuilder.group({
      habitat: this.formBuilder.control<string>(''),
      edibility: this.formBuilder.control<string>(''),
      note: this.formBuilder.control<string>(''),
    }),
    microscopicFeatures: this.formBuilder.group({
      spores: this.formBuilder.control<string>(''),
      pileipellis: this.formBuilder.control<string>(''),
      cystidia: this.formBuilder.control<string>(''),
    }),

    message: '',
  });
  onCreate() {
   this.xtotalcount = this.xtotalcount+1;
   this.iconographydata= {...this.iconographydata, iconography: this.iconography.iconographylist}

    this.store.dispatch(
      MushroomsActions.createMushroomRequest({mushroom:this.mushroomForm.value, xtotalcount: this.xtotalcount, iconographydata: this.iconographydata})
    );
     // this.store.dispatch(MushroomsActions.createIconography(this.iconographydata))
    this.router.navigate(['']);
  }

  onUpdate() {
    this.update.emit(this.mushroomForm.value)
  }
}
