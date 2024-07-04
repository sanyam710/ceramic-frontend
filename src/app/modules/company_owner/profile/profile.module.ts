import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DialogModule } from 'primeng/dialog';
import { EmployeesComponent } from './employees/employees.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';


@NgModule({
  declarations: [ProfileComponent,PersonaldetailsComponent,EmployeesComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    DialogModule
  ]
})
export class ProfileModule { }
