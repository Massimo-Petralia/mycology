import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyNewMushroomPageComponent } from './mycology-new-mushroom-page.component';

describe('MycologyNewMushroomPageComponent', () => {
  let component: MycologyNewMushroomPageComponent;
  let fixture: ComponentFixture<MycologyNewMushroomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyNewMushroomPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyNewMushroomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
