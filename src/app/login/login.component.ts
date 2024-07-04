import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../modules/shared/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  loginForm = {
    email: '',
    password: '',
  };
  errorText: string | null = null;

  login() {
    this.authService.login(this.loginForm).subscribe({
      next: (data) => {
        this.userService.setUser(data);
        this.router.navigate([
          'company_owner/products'
        ])

      },
      error: (error) => {
        this.errorText = error;
      }
    })

  }

}
