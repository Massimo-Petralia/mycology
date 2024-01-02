import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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
import {
  selectPageIndex,
  selectXtotalcount,
} from '../../mycology-state/mycology.selectors';
import { Subscription } from 'rxjs';
import { MycologyFormIconographyComponent } from '../mycology-form-iconography/mycology-form-iconography.component';
import { IconographyData, Mushroom } from '../../models/mushroom.models';
import { RouterLink } from '@angular/router';
import { MycologyFormIconographyPageComponent } from '../mycology-form-iconography-page/mycology-form-iconography-page.component';
import { RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-mycology-form-mushroom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MycologyFormIconographyComponent,
    RouterLink,
    RouterOutlet,
    MatExpansionModule,
  ],
  templateUrl: './mycology-form-mushroom.component.html',
  styleUrl: './mycology-form-mushroom.component.scss',
})
export class MycologyFormMushroomComponent implements OnInit, OnChanges {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MycologyState>,
    private router: Router,
  ) {}

  @Input() mushroom!: Mushroom;
  @Output() update = new EventEmitter<Mushroom>();
  @Output() delete = new EventEmitter<number>();


  @ViewChild(MycologyFormIconographyComponent)
  formiconography!: MycologyFormIconographyComponent;
  @ViewChild(MycologyFormIconographyPageComponent)
  formIconographyPage!: MycologyFormIconographyPageComponent;

  pageIndex$ = this.store.select(selectPageIndex);
  xtotalcount$ = this.store.select(selectXtotalcount);
  subs = new Subscription();
  iconographydata!: IconographyData;
  xtotalcount!: number;
  isCreateMode!: boolean;

  ngOnInit(): void {
    this.subs = this.xtotalcount$.subscribe((xtotal) => {
      this.xtotalcount = xtotal;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { mushroom } = changes;
    if (mushroom) {
      this.mushroomForm.patchValue(this.mushroom);
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
  });
  onCreate() {
    this.xtotalcount = this.xtotalcount + 1;

    this.iconographydata = this.formiconography.defineiconography;
    debugger;
    this.store.dispatch(
      MushroomsActions.createMushroomRequest({
        mushroom: this.mushroomForm.value,
        xtotalcount: this.xtotalcount,
        iconographydata: this.iconographydata,
      })
    );
    this.router.navigate(['']);
  }

  onUpdate() {
    this.update.emit(this.mushroomForm.value);
  }

  onDelete() {
    this.delete.emit(this.mushroom.id);
  }

  showIconography() {
    this.router.navigate(['iconography', this.mushroom.id]);
  }
}
