import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductstocklistComponent } from './productstocklist/productstocklist.component';
import { AuthGuard } from '../../shared/guards/auth-guard/auth-guard';

const routes: Routes = [
  {
    path:'',component:ProductslistComponent,canActivate:[AuthGuard]
  },
  {
    path:':id/stock',component:ProductstocklistComponent,canActivate:[AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
