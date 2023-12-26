import {
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Mushroom } from '../../models/mushroom.models';
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
import { selectXtotalcount } from '../../mycology-state/mycology.selectors';
import { MycologyIconographyListComponent } from '../mycology-iconography-list/mycology-iconography-list.component';

@Component({
  selector: 'app-mycology-mushroom-item',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MycologyIconographyListComponent
  ],
  templateUrl: './mycology-mushroom-item.component.html',
  styleUrl: './mycology-mushroom-item.component.scss',
})
export class MycologyMushroomItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() set id(mushroomId: number) {
    this.mushroomID = mushroomId;
  }
  mushroomID!: number;
  mushroom!: Mushroom | null;
  xtotalcount$ = this.store.select(selectXtotalcount)
  xtotalcount!: number
  subs = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if (id) {
      this.subs.add(
        this.dataService
        .getMushroom(this.mushroomID)
        .subscribe((mushroom: Mushroom) => {
          this.mushroom = mushroom;
          this.mushroomForm.patchValue(this.mushroom);
        })
      )
    }
  }

ngOnInit(): void {
  this.subs.add(
    this.xtotalcount$.subscribe((xtotal)=> {
      this.xtotalcount = xtotal
    })
  )
}

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private store: Store<MycologyState>,
    private router: Router
  ) {}

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

    // formArray : this.formBuilder.array([
    //   this.formBuilder.control('')
    // ]),
  
    message: '',
    type: null,
  });
  // get immagini() {
  //   return this.mushroomForm.get('formArray') as FormArray
  // }


// addImmagine() {
//    this.immagini.push(this.formBuilder.control(''))
//   }


// colorGroup = this.formBuilder.group({
//   colori: this.formBuilder.array([
//     this.formBuilder.control('')
//   ])
// })

// get colori() {
//   return this.colorGroup.get('colori') as FormArray
// }

// addColor() {
//   this.colori.push(this.formBuilder.control(''))

// }


  onSave() {
    this.store.dispatch(
      MushroomsActions.updateMushroomRequest(this.mushroomForm.value)
    );
  }

  onDelete() {
    this.xtotalcount = this.xtotalcount-1
    this.store.dispatch(
      MushroomsActions.deleteMushroomRequest({ id: Number(this.mushroom?.id), xtotalcount: this.xtotalcount })
    );
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
