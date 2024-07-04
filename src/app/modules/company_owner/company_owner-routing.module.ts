import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { 
        path: 'dashboard', component: DashboardComponent 
      },
      {
        path:'products',loadChildren:()=>import('./products/products.module').then((m)=>m.ProductsModule)
      },
      { 
        path: 'profile', loadChildren:()=>import('./profile/profile.module').then((m)=>m.ProfileModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyOwnerRoutingModule { }
