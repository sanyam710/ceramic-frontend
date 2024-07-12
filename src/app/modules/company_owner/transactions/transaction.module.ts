import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';
import { AddEditTransactionComponent } from './add-edit-transaction/add-edit-transaction.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionlistComponent,
    AddEditTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    AddEditTransactionComponent
  ]
})
export class TransactionModule { }
