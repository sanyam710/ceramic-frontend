import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderslistComponent } from './customerorderslist.component';

describe('CustomerorderslistComponent', () => {
  let component: CustomerorderslistComponent;
  let fixture: ComponentFixture<CustomerorderslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerorderslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerorderslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
