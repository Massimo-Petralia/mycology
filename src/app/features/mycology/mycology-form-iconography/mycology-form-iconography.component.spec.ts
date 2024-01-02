import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyFormIconographyComponent } from './mycology-form-iconography.component';

describe('MycologyFormIconographyComponent', () => {
  let component: MycologyFormIconographyComponent;
  let fixture: ComponentFixture<MycologyFormIconographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyFormIconographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyFormIconographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
