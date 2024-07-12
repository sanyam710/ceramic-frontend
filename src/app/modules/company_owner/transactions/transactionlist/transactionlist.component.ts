import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from 'src/app/modules/shared/services/sweetalertservice.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrl: './transactionlist.component.scss'
})
export class TransactionlistComponent {
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private orderService: OrderService,
    private sweetAlertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  userId: string | null = null;
  orderId: string | null = null;
  transactionsList: any = [];
  transaction: any = { mode_of_payment: null };
  boolViewTransaction: boolean = false;
  addEditTransactionDialog: boolean = false;
  transactionToEditIndex: number | null = null;
  transactionToAddOrder: any = {};
  addOrderDialog: boolean = false;
  modeOfPayment: any = {};
  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.route.params.subscribe(({ id }) => {
      this.orderId = id;
    })
    this.modeOfPayment = Constants.MODE_OF_PAYMENTS
    this.orderService.getOrderById(this.orderId!).subscribe({
      next: (data) => {
        this.transactionsList = data.transactions;
      },
      error: (error) => {

      }
    })

  }
  editTransaction(transaction: any, index: number) {
    this.transaction = { ...transaction };
    this.addEditTransactionDialog = true;
    this.transactionToEditIndex = index;
    this.boolViewTransaction = true;
  }
  addTransaction() {
    this.addEditTransactionDialog = true;
  }
  async delete(id: string, index: number) {
    var x = await this.sweetAlertService.warning("Warning", "Are you sure you want to delete the Transaction");
    if (x.value) {
      this.orderService.removeTransaction(id).subscribe({
        next: (data) => {
          this.transactionsList.splice(index, 1);
          this.toastService.showToast("Transaction Deleted Successfully", "success");
        },
        error: (error) => {
          return;
        }
      })
    }
  }
  closeAddOrEditTransaction(event: any) {
    this.addEditTransactionDialog = false;
    this.boolViewTransaction = false;
    this.transaction = { mode_of_payment: null };
    this.transactionToEditIndex = null;
  }
  addOrUpdateTransaction(event: any) {
    if (this.boolViewTransaction) {
      this.transactionsList[this.transactionToEditIndex!] = event;
    }
    else {
      this.transactionsList.push(event);
    }
    this.closeAddOrEditTransaction("false");
  }
  goTo(url: string) {
    this.router.navigate([url]);
  }
}
