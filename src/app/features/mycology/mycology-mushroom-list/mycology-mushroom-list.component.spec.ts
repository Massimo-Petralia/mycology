import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycologyMushroomListComponent } from './mycology-mushroom-list.component';

describe('MycologyMushroomListComponent', () => {
  let component: MycologyMushroomListComponent;
  let fixture: ComponentFixture<MycologyMushroomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycologyMushroomListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycologyMushroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
