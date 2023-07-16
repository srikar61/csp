import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    // Perform signup logic
    if (this.username && this.email && this.password) {
      this.http.post('http://localhost:3000/signup', { username: this.username, email: this.email, password: this.password })
        .subscribe((response: any) => {
          console.log(response);
          // Handle the signup response
          if (response.success) {
            this.router.navigate(['dashboard/login']);
          } else {
            alert('Username already exists');
          }
        }, (error) => {
          console.error(error);
        });
    }
  }
}
