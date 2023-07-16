import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Call the logout() method from the AuthService
    this.router.navigate(['/dashboard']); // Redirect to the dashboard after logout
  }
}
