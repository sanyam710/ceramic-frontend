import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';

@Component({
  selector: 'app-add-edit-product-stock',
  templateUrl: './add-edit-product-stock.component.html',
  styleUrl: './add-edit-product-stock.component.scss'
})
export class AddEditProductStockComponent {
  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) { }

  @Input() stock: any = {};
  @Input() boolEditStock: boolean = false;
  @Input() addOrEditStockDialog: boolean = false;
  @Input() productId: string | null = null;
  @Output() close = new EventEmitter<any>();
  @Output() addOrUpdateStock=new EventEmitter<any>();
  canceladdOrEditStock() {
    this.boolEditStock = false;
    this.addOrEditStockDialog = false;
    this.close.emit(false);
  }
  addNewStock() {
    this.stock.product_id = this.productId;
    this.productService.addStockToProduct(this.stock).subscribe({
      next: (data) => {
        this.toastService.showToast("Product Added Successfully", "success");
        this.addOrEditStockDialog = false;
        this.addOrUpdateStock.emit(data);
        this.close.emit(data);
      },
      error: (error) => {
        this.toastService.showToast(error,"error");
      }
    })

  }
  updateStock() {
    this.productService.updateStockInProduct(this.stock).subscribe({
      next: (data) => {
        this.toastService.showToast("Stock Updated Successfully", "success");
        this.addOrEditStockDialog = false;
        this.addOrUpdateStock.emit(data);
        this.close.emit(data);
      },
      error: (error) => {
        this.toastService.showToast(error,"error");
      }
    })
  }

}
