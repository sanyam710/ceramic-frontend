import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';

const routes: Routes = [
  {
    path:'',component:TransactionlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
