import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomItemComponent } from './mycology-mushroom-item.component';

describe('MycologyMushroomItemComponent', () => {
  let component: MycologyMushroomItemComponent;
  let fixture: ComponentFixture<MycologyMushroomItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
