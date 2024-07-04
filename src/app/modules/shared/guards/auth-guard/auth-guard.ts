// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
  curentTime: any;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userId = this.userService.getUserId();
    this.curentTime = Date.now();
    if (this.curentTime > this.userService.getExpiryTime()) {
      window.localStorage.clear();
      this.router.navigate([
        '/login',
      ]);
      return false;
    }
    if (userId) {
      return true; // User is authenticated

    } else {
      window.localStorage.clear();
      this.router.navigate([
        '/login',
      ]);
      return false;
    }
  }
}
