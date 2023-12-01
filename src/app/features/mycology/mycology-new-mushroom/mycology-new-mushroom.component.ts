import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { Router } from '@angular/router';
import { Iconography } from '../../models/mushroom.models';

@Component({
  selector: 'app-mycology-new-mushroom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './mycology-new-mushroom.component.html',
  styleUrl: './mycology-new-mushroom.component.scss',
})
export class MycologyNewMushroomComponent {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MycologyState>,
    private router: Router
  ) {}

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
    iconography: this.formBuilder.control<Iconography[]>([]) ,

    message: '',
  });

  onCreate() {
    this.store.dispatch(
      MushroomsActions.createMushroom(this.mushroomForm.value)
    );
    this.router.navigate(['']);
  }
}
