import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { CustomerorderslistComponent } from './customerorderslist/customerorderslist.component';
import { CustomerorderdetailslistComponent } from './customerorderdetailslist/customerorderdetailslist.component';
import { AuthGuard } from '../../shared/guards/auth-guard/auth-guard';

const routes: Routes = [
  {
    path:'',component:CustomerslistComponent,canActivate:[AuthGuard]
  },
  {
    path:':id/orders',component:CustomerorderslistComponent,canActivate:[AuthGuard]
  },
  {
    path:':customer_id/orders/details/:order_id',component:CustomerorderdetailslistComponent,canActivate:[AuthGuard]
  },
  {
    path:'orders/transactions/:id',loadChildren:()=>import('../transactions/transaction.module').then((m)=>m.TransactionModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
