import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomEditComponent } from './mycology-mushroom-edit.component';

describe('MycologyMushroomEditComponent', () => {
  let component: MycologyMushroomEditComponent;
  let fixture: ComponentFixture<MycologyMushroomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
