import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;

  constructor(private http: HttpClient, private router: Router) { }


  
  login() {
    this.http.post('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe((response: any) => {
        console.log(response);
        // Handle the login response
        if (response.success) {
          this.router.navigate(['/home2']);
        } else {
          // Handle invalid credentials
        }
      });
  }
}
