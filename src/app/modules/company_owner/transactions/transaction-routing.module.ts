import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';
import { AuthGuard } from '../../shared/guards/auth-guard/auth-guard';

const routes: Routes = [
  {
    path:'',component:TransactionlistComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
