import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  firstNameSubject = new BehaviorSubject<string>("");
  lastNameSubject = new BehaviorSubject<string>("");
  firstName$ = this.firstNameSubject.asObservable();
  lastName$ = this.lastNameSubject.asObservable();
  setUser(user: any): void {
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('mobile_no', user.mobile_no);
    localStorage.setItem('api_token', user.api_token);
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email);
    
    localStorage.setItem('expiry_time', (Date.now() + 24 * 60 * 60 * 1000).toString());
    localStorage.setItem('first_name', user.first_name);
    if (user.last_name == null) {
      localStorage.setItem('last_name', "");
    }
    else {
      localStorage.setItem('last_name', user.last_name);
    }
    localStorage.setItem('user_type', user.user_type);
    localStorage.setItem('name', user.name);
    this.firstNameSubject.next(user.first_name);
    this.lastNameSubject.next(user.last_name);
  }
  getUserId(): string | null {
    return window.localStorage.getItem('user_id');
  }
  getExpiryTime(): string {
    return window.localStorage.getItem('expiry_time')!;
  }
  getUserType():string | null{
    return window.localStorage.getItem('user_type');
  }
  updateName(firstName: string, lastName: string): void {
    this.firstNameSubject.next(firstName);
    this.lastNameSubject.next(lastName);
  }
  
  getUser(): any | null {
    var user = {
      user_type: localStorage.getItem('user_type'),
      user_id: localStorage.getItem('user_id'),
      email: localStorage.getItem('email'),
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
      mobile_no: localStorage.getItem('mobile_no'),
      address: localStorage.getItem('address'),
    };
    return user;
  }
  getUserName() {
    return {
      first_name: window.localStorage.getItem('first_name'),
      last_name: window.localStorage.getItem('last_name')
    };
  }
  // getBooleanEmployeeAccess() {
  //   var client_module_access = window.localStorage.getItem('client_module_access');
  //   var client_module_access_bool = client_module_access === 'true';
  //   var export_access = window.localStorage.getItem('export_access');
  //   var export_access_bool = export_access === 'true';
  //   var intimation_module_access = window.localStorage.getItem('intimation_module_access');
  //   var intimation_module_access_bool = intimation_module_access === 'true';
  //   var company_product_access = window.localStorage.getItem('company_product_access');
  //   var company_product_access_bool = company_product_access === 'true';
  //   var tpa_access = window.localStorage.getItem('tpa_access');
  //   var tpa_access_bool = tpa_access === 'true';
  //   return {
  //     client_module_access: client_module_access_bool,
  //     export_access: export_access_bool,
  //     intimation_module_access: intimation_module_access_bool,
  //     company_product_access: company_product_access_bool,
  //     tpa_access: tpa_access_bool
  //   }
  // }
}
