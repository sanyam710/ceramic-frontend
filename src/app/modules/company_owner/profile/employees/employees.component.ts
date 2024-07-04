import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
// import { EmployeeService } from '../../../services/employee.service';
// import { UserService } from 'src/app/modules/shared/services/user.service';
// import { Constants } from 'src/app/constants/constants';
// import { ToastService } from 'src/app/modules/shared/components/toast/toast.service';
interface Permission {
  key: string;
  value: string;
}
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  constructor(
    // private employeeService: EmployeeService,
    private userService: UserService,
    private toastService: ToastService
  ) { }
  userId: string | null = null;
  list: any = [];
  addEmployeeDialog: boolean = false;
  newEmployee: any = {status_id:""};
  employeeStatus: {} = {};
  staffPermissions: any = {};
  selectedPermissions: { [key: string]: boolean } = {};
  permissions: string[] = [];
  editEmployeeDialog: boolean = false;
  editData: any = {};
  editDataIndex: number = 0;


  ngOnInit() {
    this.userId = this.userService.getUserId();
    // this.employeeStatus = Constants.EMPLOYEE_STATUS;
    // this.staffPermissions = Constants.STAFF_PERMISSIONS;
    this.permissions = Object.keys(this.staffPermissions);
    console.log(this.permissions);


    // this.employeeService.getAllEmployees(this.userId!).subscribe(
    //   (data) => {
    //     this.list = data;
    //   },
    //   (error) => {

    //   }
    // )
  }
  addStaff() {
    this.addEmployeeDialog = true;
  }
  toggle(permission: string, edit: boolean) {
    if (!edit) {
      this.selectedPermissions[permission] = !this.selectedPermissions[permission];
    }
    if (edit) {
      this.editData[permission] = !this.editData[permission];
    }
  }
  editEmployee(employee: {}, index: number) {
    this.editData = { ...employee };
    this.editDataIndex = index;
    this.editEmployeeDialog = true;
    console.log(this.editData);
  }
  addNewEmployee() {
    if (!this.newEmployee.mobile_no || this.newEmployee.mobile_no.length != 10) {
      this.toastService.showToast("Phone Number is Incorrect", "error");
      return;
    }
    if (!this.newEmployee.status_id) {
      this.toastService.showToast("Select Employee Status", "error");
      return;
    }
    this.newEmployee = { ... this.newEmployee, ...this.selectedPermissions }
    // this.newEmployee.user_type = Constants.USER_TYPE_STAFF;
    this.newEmployee.agent_id = this.userId;
    // this.employeeService.addEmployee(this.newEmployee).subscribe(
    //   (data) => {
    //     this.toastService.showToast("Employee Added Successfully", "success");
    //     this.list.push(data);
    //     this.newEmployee = {status_id:""};
    //     this.addEmployeeDialog = false;

    //   },
    //   (error) => {
    //     this.toastService.showToast(error, "error");
    //   }
    // )
  }
  updateEmployeeDetails() {
    if (!this.editData.mobile_no || this.editData.mobile_no.length != 10) {
      this.toastService.showToast("Phone Number is Incorrect", "error");
      return;
    }
    if (!this.editData.status_id) {
      this.toastService.showToast("Select Employee Status", "error");
      return;
    }
    console.log(this.editData);
    // this.employeeService.updateEmployee(this.editData).subscribe(
    //   (data) => {
    //     this.toastService.showToast("Employee Details Updated Successfully", "success");
    //     this.list[this.editDataIndex] = data;
    //     this.editData = {};
    //     this.editEmployeeDialog = false;

    //   },
    //   (error) => {
    //     this.toastService.showToast(error, "error");
    //   }
    // )
  }

}
