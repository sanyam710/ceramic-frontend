import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrl: './add-edit-order.component.scss'
})
export class AddEditOrderComponent {
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) { }

  @Input() order: any = {};
  @Input() customerId: string | null = null;
  @Input() addEditOrderDiaog: boolean = false;
  @Output() close = new EventEmitter<any>();
  @Output() newOrUpdatedOrder = new EventEmitter<any>();
  @Input() boolEditOrder: boolean = false;

  addNewOrder() {
    console.log(this.customerId);
    this.order.customer_id = this.customerId;
    this.orderService.addOrder(this.order).subscribe({
      next: (data) => {
        this.toastService.showToast("Order Added Succesfully", "success");
        this.newOrUpdatedOrder.emit(data);
        this.close.emit(false);
      },
      error: (error) => {
      }
    })
  }
  updateOrderDetails() {
    this.orderService.updateOrder(this.order).subscribe({
      next: (data) => {
        this.toastService.showToast("Order Updated Succesfully", "success");
        this.newOrUpdatedOrder.emit(data);
        this.closeDialog();

      },
      error: (error) => {
      }
    })
  }
  closeDialog() {
    this.order = {};
    // this.customerId=null;
    this.boolEditOrder = false;
    this.close.emit(false);

    this.close.emit(false);
  }

}
