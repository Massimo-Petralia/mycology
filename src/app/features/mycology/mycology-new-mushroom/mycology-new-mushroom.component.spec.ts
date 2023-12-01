import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyNewMushroomComponent } from './mycology-new-mushroom.component';

describe('MycologyNewMushroomComponent', () => {
  let component: MycologyNewMushroomComponent;
  let fixture: ComponentFixture<MycologyNewMushroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyNewMushroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyNewMushroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
