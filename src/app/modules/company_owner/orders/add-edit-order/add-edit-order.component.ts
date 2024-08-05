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
  @Input() customer: any = {};

  addNewOrder() {
    if (!this.order.site_address || this.order.site_address == "") {
      this.toastService.showToast("Site Address Is Mandatory", "error");
      return;
    }
    this.order.customer_id = this.customerId;
    this.orderService.addOrder(this.order).subscribe({
      next: (data) => {
        this.toastService.showToast("Order Added Succesfully", "success");
        this.newOrUpdatedOrder.emit(data);
        this.close.emit(false);
      },
      error: (error) => {
        this.toastService.showToast(error, "error");
      }
    })
  }
  updateOrderDetails() {
    if (!this.order.site_address || this.order.site_address == "") {
      this.toastService.showToast("Site Address Is Mandatory", "error");
      return;
    }
    this.orderService.updateOrder(this.order).subscribe({
      next: (data) => {
        this.toastService.showToast("Order Updated Succesfully", "success");
        this.newOrUpdatedOrder.emit(data);
        this.closeDialog();

      },
      error: (error) => {
        this.toastService.showToast(error, "error");
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
  siteAddress(event: any) {
    this.order.is_siteAddressSame = event.target.checked;
    if (this.order.is_siteAddressSame) {
      this.order.site_address = this.customer.address;
    }
    else {
      this.order.site_address = null;
    }
    console.log(this.order.is_siteAddressSame);
  }

}
