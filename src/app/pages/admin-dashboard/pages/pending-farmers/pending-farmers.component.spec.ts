import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFarmersComponent } from './pending-farmers.component';

describe('PendingFarmersComponent', () => {
  let component: PendingFarmersComponent;
  let fixture: ComponentFixture<PendingFarmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingFarmersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingFarmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
