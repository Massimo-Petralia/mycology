import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomTableComponent } from './mycology-mushroom-table.component';

describe('MycologyMushroomTableComponent', () => {
  let component: MycologyMushroomTableComponent;
  let fixture: ComponentFixture<MycologyMushroomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
