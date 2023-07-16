import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access
    } else {
      this.router.navigate(['/dashboard/login']);
      
      return false; // User is not logged in, deny access and redirect to the login page
    }
  }
}
