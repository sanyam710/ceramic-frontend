import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyOwnerRoutingModule } from './company_owner-routing.module';
  

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    
  ],
  imports: [
    CommonModule,
    CompanyOwnerRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule ,
    
  ]
})
export class CompanyOwnerModule { }
