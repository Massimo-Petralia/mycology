import {
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mushroom } from '../../models/mushroom.models';
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
import  { MycologyFormMushroomComponent } from '../mycology-form-mushroom/mycology-form-mushroom.component'
import { MycologyIconographyListComponent } from '../mycology-iconography-list/mycology-iconography-list.component';

@Component({
  selector: 'app-mycology-mushroom-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MycologyFormMushroomComponent,
    MycologyIconographyListComponent,
  ],
  templateUrl: './mycology-mushroom-edit.component.html',
  styleUrl: './mycology-mushroom-edit.component.scss',
})
export class MycologyMushroomEditComponent
 
{
  // @Input() set id(mushroomId: number) {
  //   this.mushroomID = mushroomId;
  // }
  //mushroomID!: number;
 // @Input() mushroom!: Mushroom ;
  
  // xtotalcount$ = this.store.select(selectXtotalcount);
  // xtotalcount!: number;
  // subs = new Subscription();



  // ngOnInit(): void {
  //   this.subs.add(
  //     this.xtotalcount$.subscribe((xtotal) => {
  //       this.xtotalcount = xtotal;
  //     })
  //   );
  // }

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

   // message: '',
    type: null,
  });

  // onSave() {
  //   this.store.dispatch(
  //     MushroomsActions.updateMushroomRequest(this.mushroomForm.value)
  //   );
  // }

  // onDelete() {
  //   this.xtotalcount = this.xtotalcount - 1;
  //   this.store.dispatch(
  //     MushroomsActions.deleteMushroomRequest({
  //       id: Number(this.mushroom?.id),
  //       xtotalcount: this.xtotalcount,
  //     })
  //   );
  //   this.router.navigate(['mushromm-list']);
  // }


}
