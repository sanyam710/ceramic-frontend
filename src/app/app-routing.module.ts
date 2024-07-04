import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',component:LoginComponent
  },
  {
    path:'login',component:LoginComponent
  },
  { 
    path: 'company_owner', loadChildren: () => import('./modules/company_owner/company_owner.module').then((m) => m.CompanyOwnerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
