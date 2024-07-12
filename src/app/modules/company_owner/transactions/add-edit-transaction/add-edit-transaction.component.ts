import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { OrderService } from '../../services/order.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.component.html',
  styleUrl: './add-edit-transaction.component.scss'
})
export class AddEditTransactionComponent {
  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) { }

  @Input() transaction: any = {mode_of_payment:null};
  @Input() orderId: string | null = null;
  @Input() addEditTransactionDiaog: boolean = false;
  @Output() close = new EventEmitter<any>();
  @Output() newOrUpdatedTransaction = new EventEmitter<any>();
  @Input() boolViewTransaction: boolean = false;
  modeOfPayment=Constants.MODE_OF_PAYMENTS;
  addNewTransaction() {
    console.log(this.orderId);
    this.transaction.order_id = this.orderId;
    this.orderService.addTransaction(this.transaction).subscribe({
      next: (data) => {
        this.toastService.showToast("Transaction Added Succesfully", "success");
        this.newOrUpdatedTransaction.emit(data);
        this.close.emit(false);
      },
      error: (error) => {
      }
    })
  }
  // updateTransactionDetails() {
  //   this.orderService.updateTransaction(this.transaction).subscribe({
  //     next: (data) => {
  //       this.toastService.showToast("Transaction Updated Succesfully", "success");
  //       this.newOrUpdatedTransaction.emit(data);
  //       this.closeDialog();

  //     },
  //     error: (error) => {
  //     }
  //   })
  // }
  closeDialog() {
    this.close.emit(false);

    this.close.emit(false);
  }
}
