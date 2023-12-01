import { Component, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iconography, Mushroom } from '../../models/mushroom.models';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { MycologyState } from '../../models/mycology-state.models';
import * as MushroomsActions from '../../mycology-state/mycology.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycology-mushroom-item',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './mycology-mushroom-item.component.html',
  styleUrl: './mycology-mushroom-item.component.scss',
})
export class MycologyMushroomItemComponent implements OnDestroy {
  @Input() set id(mushroomId: number) {
    this.subs = this.dataService
      .getMushroom(mushroomId)
      .subscribe((mushroom) => {
        this.mushroom = mushroom;
        this.mushroomForm.patchValue(mushroom);
      });
  }
  subs = new Subscription();

  mushroom: Mushroom = {
    taxonomy: {
      AA: null,
      species: null,
      gender: null,
      family: null,
      order: null,
      synonymous: null,
    },
    morphology: {
      cap: null,
      gills: null,
      stalk: null,
      flesh: null,
    },
    features: {
      habitat: null,
      edibility: null,
      note: null,
    },
    microscopicFeatures: {
      spores: null,
      pileipellis: null,
      cystidia: null,
    },
    iconography: [],
    message: '',
  };

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private store: Store<MycologyState>,
    private router: Router
  ) {}

  // formTaxsonomy = this.formBuilder.group({
  //   AA: this.formBuilder.control<string>(''),
  //   species: this.formBuilder.control<string>(''),
  //   gender: this.formBuilder.control<string>(''),
  //   family: this.formBuilder.control<string>(''),
  //   order: this.formBuilder.control<string>(''),
  //   synonymous: this.formBuilder.control<string>(''),
  // });

  // formMorphology = this.formBuilder.group({
  //   cap: this.formBuilder.control<string>(''),
  //   gills: this.formBuilder.control<string>(''),
  //   stalk: this.formBuilder.control<string>(''),
  //   flesh: this.formBuilder.control<string>(''),
  // });

  // formFeatures = this.formBuilder.group({
  //   habitat: this.formBuilder.control<string>(''),
  //   edibility: this.formBuilder.control<string>(''),
  //   note: this.formBuilder.control<string>(''),
  // });

  // formMicroscopicFeatures = this.formBuilder.group({
  //   spores: this.formBuilder.control<string>(''),
  //   pileipellis: this.formBuilder.control<string>(''),
  //   cystidia: this.formBuilder.control<string>(''),
  // });

  mushroomForm: FormGroup = this.formBuilder.group({
    id: null,
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
    iconography: this.formBuilder.control<Iconography[]>([]),
    message: '',
    type: null,
  });

  onSave() {
    this.store.dispatch(
      MushroomsActions.updateMushroom(
        this.mushroomForm.value
        //   {
        //   id: this.mushroom.id,
        //   taxonomy: this.formTaxsonomy.value,
        //   morphology: this.formMorphology.value,
        //   features: this.formFeatures.value,
        //   microscopicFeatures: this.formMicroscopicFeatures.value,
        //   iconography: [],
        //   message: '',
        // }
      )
    );
    // const fungo : Mushroom = this.mushroom
    // const pippo = {...fungo, taxonomy: {...fungo.taxonomy, species: 'giggi'}}
    // //pippo.taxonomy = {species: 'giggi'}

    // debugger
  }

  onDelete() {
    this.store.dispatch(
      MushroomsActions.deleteMushroom({ id: Number(this.mushroom.id) })
    );
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
