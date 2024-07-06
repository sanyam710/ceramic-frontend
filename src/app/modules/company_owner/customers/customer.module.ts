import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CustomerorderslistComponent } from './customerorderslist/customerorderslist.component';
import { CustomerorderdetailslistComponent } from './customerorderdetailslist/customerorderdetailslist.component';


@NgModule({
  declarations: [
    CustomerslistComponent,
    CustomerorderslistComponent,
    CustomerorderdetailslistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
