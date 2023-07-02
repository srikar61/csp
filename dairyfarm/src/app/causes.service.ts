import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CausesService {
  private apiUrl = 'http://localhost:3000/api/causes'; // The API endpoint in the Express server

  constructor(private http: HttpClient) {}

  getCausesData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
