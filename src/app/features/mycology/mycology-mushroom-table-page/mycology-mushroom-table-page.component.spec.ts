import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomTablePageComponent } from './mycology-mushroom-table-page.component';

describe('MycologyMushroomTablePageComponent', () => {
  let component: MycologyMushroomTablePageComponent;
  let fixture: ComponentFixture<MycologyMushroomTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomTablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
