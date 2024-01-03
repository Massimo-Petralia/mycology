import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomPageComponent } from './mycology-mushroom-page.component';

describe('MycologyMushroomPageComponent', () => {
  let component: MycologyMushroomPageComponent;
  let fixture: ComponentFixture<MycologyMushroomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
