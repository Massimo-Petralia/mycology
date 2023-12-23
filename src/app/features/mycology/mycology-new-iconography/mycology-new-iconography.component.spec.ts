import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyNewIconographyComponent } from './mycology-new-iconography.component';

describe('MycologyNewIconographyComponent', () => {
  let component: MycologyNewIconographyComponent;
  let fixture: ComponentFixture<MycologyNewIconographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyNewIconographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyNewIconographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
