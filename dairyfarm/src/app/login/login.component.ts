import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.redirectToHome();
        } else {
          alert("Invalid credentials");
        }
      });
  }

  redirectToHome() {
    this.router.navigate(['/home2']);
  }
}
