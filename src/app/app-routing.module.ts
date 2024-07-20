import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './modules/shared/guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',component:LoginComponent
  },
  {
    path:'login',component:LoginComponent,canActivate:[loginGuard]
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
