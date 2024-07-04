import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStaffGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  userType: string | null = null;
  employeeAccess: any = {};


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userType = this.userService.getUserType();
    if (this.userType == "3") {
        this.router.navigate(['/agent/dashboard']);
        return false;
      return false;
    }
    return true;
  }

  // Additional functions if needed
  additionalFunction(): void {
    // Your additional function logic
  }
}
