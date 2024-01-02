import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomEditPageComponent } from './mycology-mushroom-edit-page.component';

describe('MycologyMushroomEditPageComponent', () => {
  let component: MycologyMushroomEditPageComponent;
  let fixture: ComponentFixture<MycologyMushroomEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
