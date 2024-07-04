import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(
    private apiService: ApiService,
  ) { }
  login(req: {}) {
    return this.apiService.post('/user/request_access', req);
  }
}
