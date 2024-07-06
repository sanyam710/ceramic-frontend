import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderdetailslistComponent } from './customerorderdetailslist.component';

describe('CustomerorderdetailslistComponent', () => {
  let component: CustomerorderdetailslistComponent;
  let fixture: ComponentFixture<CustomerorderdetailslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerorderdetailslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerorderdetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
