import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { environment } from 'src/app/environments/environment';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { PersonaldetailsService } from '../../services/personaldetails.service';
@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrl: './personaldetails.component.scss'
})
export class PersonaldetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private personalDetailsService: PersonaldetailsService,
    private toastService: ToastService,
  ) { }

  readData: any = {};
  editData: any = {};
  editProfileDetails: boolean = false;
  password: any = {};
  userId: string | null = null;
  baseUrl: string = "";
  intimaitonKey: string | null = null;
  employeePermission: any = {};
  agentPermission: any = {
    "intimation_module_access": true,
    "export_access": true,
    "client_module_access": true
  };
  userType:string | null=null;

  ngOnInit() {
    this.readData = this.userService.getUser();
    this.userId = this.userService.getUserId();
    this.baseUrl = environment.BASE_URL;
    this.userType=this.userService.getUserType();
  }

  editDetails() {
    this.editProfileDetails = true;
    this.editData = { ... this.readData };
  }
  cancelEditProfileDetails() {
    this.editProfileDetails = false;

  }
  updateProfileDetails() {
    this.editData.id = this.readData.user_id;
    this.editData.status_id = 1;
    // if (this.editData.user_type == Constants.USER_TYPE_STAFF) {
    //   this.employeePermission = this.userService.getBooleanEmployeeAccess();
    //   this.editData = { ... this.editData, ... this.employeePermission };
    // }
    // else if (this.editData.user_type == Constants.USER_TYPE_AGENT) {
    //   this.editData = { ... this.editData, ... this.agentPermission }
    // }
    this.userService.updateName(this.editData.first_name, this.editData.last_name);

    this.personalDetailsService.updateUser(this.editData).subscribe(
      (data) => {
        this.toastService.showToast("Details Updated Successfully", "success");
        window.localStorage.setItem("first_name", data.first_name);
        window.localStorage.setItem("last_name", data.last_name);
        window.localStorage.setItem("mobile_no", data.mobile_no);
        this.readData = { ... this.editData };
        this.editData = {};
        this.editProfileDetails = false;
      },
      (error) => {
        this.toastService.showToast(error, "error");
      }
    )

  }
  updatePassword() {
    this.password.id = this.userId;
    this.personalDetailsService.changePassword(this.password).subscribe(
      (data) => {
        this.toastService.showToast("Password Updated Successfully", "success");
        this.password = {};

      },
      (error) => {
        this.toastService.showToast(error, "error");
      }
    )
  }
}
