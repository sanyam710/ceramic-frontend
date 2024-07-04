import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaldetailsService {
  constructor(
    private apiService: ApiService,
  ) { }

  changePassword(password:{}) {
    return this.apiService.post("/user/update_password", password)
  }
  updateUser(user:{}) {
    return this.apiService.post("/user/edit_user", user)
  }
}
