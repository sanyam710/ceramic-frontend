import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductstocklistComponent } from './productstocklist/productstocklist.component';

const routes: Routes = [
  {
    path:'',component:ProductslistComponent
  },
  {
    path:':id/stock',component:ProductstocklistComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
