import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): boolean {
    // Your authentication logic here
    // Example: sending the username and password to the server using HttpClient
    this.http.post('http://localhost:3000/login', { username, password })
      .subscribe((response: any) => {
        this.loggedIn = response.success;
      });
    return this.loggedIn;
  }

  logout(): void {
    // Your logout logic here
    this.loggedIn = false; // Set loggedIn to false
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
