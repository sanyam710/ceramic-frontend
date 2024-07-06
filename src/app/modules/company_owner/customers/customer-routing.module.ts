import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { CustomerorderslistComponent } from './customerorderslist/customerorderslist.component';
import { CustomerorderdetailslistComponent } from './customerorderdetailslist/customerorderdetailslist.component';

const routes: Routes = [
  {
    path:'',component:CustomerslistComponent
  },
  {
    path:':id/orders',component:CustomerorderslistComponent
  },
  {
    path:':customer_id/orders/details/:order_id',component:CustomerorderdetailslistComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
