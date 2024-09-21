import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbuyerdetailsComponent } from './productbuyerdetails.component';

describe('ProductbuyerdetailsComponent', () => {
  let component: ProductbuyerdetailsComponent;
  let fixture: ComponentFixture<ProductbuyerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductbuyerdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductbuyerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
