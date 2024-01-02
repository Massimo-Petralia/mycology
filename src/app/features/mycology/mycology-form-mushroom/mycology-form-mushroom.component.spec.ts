import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyFormMushroomComponent } from './mycology-form-mushroom.component';

describe('MycologyFormMushroomComponent', () => {
  let component: MycologyFormMushroomComponent;
  let fixture: ComponentFixture<MycologyFormMushroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyFormMushroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyFormMushroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
