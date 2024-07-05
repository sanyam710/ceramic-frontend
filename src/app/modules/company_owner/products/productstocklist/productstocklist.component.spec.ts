import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstocklistComponent } from './productstocklist.component';

describe('ProductstocklistComponent', () => {
  let component: ProductstocklistComponent;
  let fixture: ComponentFixture<ProductstocklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductstocklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductstocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
