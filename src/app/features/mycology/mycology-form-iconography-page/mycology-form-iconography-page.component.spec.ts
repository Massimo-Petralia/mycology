import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyFormIconographyPageComponent } from './mycology-form-iconography-page.component';

describe('MycologyFormIconographyPageComponent', () => {
  let component: MycologyFormIconographyPageComponent;
  let fixture: ComponentFixture<MycologyFormIconographyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyFormIconographyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyFormIconographyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
