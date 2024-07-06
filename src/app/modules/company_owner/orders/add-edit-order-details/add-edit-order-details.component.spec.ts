import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrderDetailsComponent } from './add-edit-order-details.component';

describe('AddEditOrderDetailsComponent', () => {
  let component: AddEditOrderDetailsComponent;
  let fixture: ComponentFixture<AddEditOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
