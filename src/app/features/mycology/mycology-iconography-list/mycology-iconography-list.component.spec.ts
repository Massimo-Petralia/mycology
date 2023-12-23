import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyIconographyListComponent } from './mycology-iconography-list.component';

describe('MycologyIconographyListComponent', () => {
  let component: MycologyIconographyListComponent;
  let fixture: ComponentFixture<MycologyIconographyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyIconographyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyIconographyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
