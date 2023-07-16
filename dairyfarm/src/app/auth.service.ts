import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/login', { username, password })
      .pipe(
        map((response: any) => {
          this.loggedIn = response.success;
          return this.loggedIn;
        })
      );
  }

  logout(): void {
    // Your logout logic here
    this.loggedIn = false; // Set loggedIn to false
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
