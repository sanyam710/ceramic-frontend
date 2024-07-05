import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductStockComponent } from './add-edit-product-stock.component';

describe('AddEditProductStockComponent', () => {
  let component: AddEditProductStockComponent;
  let fixture: ComponentFixture<AddEditProductStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProductStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
