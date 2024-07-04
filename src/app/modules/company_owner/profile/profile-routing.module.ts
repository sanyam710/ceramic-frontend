import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from '../../shared/guards/auth-guard/auth-guard';
import { EmployeeStaffGuard } from '../../shared/guards/employee-guard/employee-staff.guard';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: 'details', component: PersonaldetailsComponent, canActivate: [AuthGuard] },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard, EmployeeStaffGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
