import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductslistComponent } from './productslist/productslist.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AddEditProductStockComponent } from './add-edit-product-stock/add-edit-product-stock.component';
import { ProductstocklistComponent } from './productstocklist/productstocklist.component';


@NgModule({
  declarations: [
    ProductslistComponent,
    AddEditProductStockComponent,
    ProductstocklistComponent 
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
