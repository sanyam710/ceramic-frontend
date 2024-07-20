import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Constants } from "src/app/constants/constants";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userId = this.userService.getUserId();
    const userType = this.userService.getUserType();

    if (userId != null) {
      if (userType == Constants.USER_TYPE_OWNER.toString())
        {
        this.router.navigate([
          '/company_owner/products',
        ]);
      }
      return false

    } else {
      window.localStorage.clear();
      return true;
    }
  }
}