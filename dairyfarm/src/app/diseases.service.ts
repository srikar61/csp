import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiseasesService {
  private apiUrl = 'http://localhost:3000/api/diseases'; // The API endpoint in the Express server

  constructor(private http: HttpClient) {}

  getDiseasesData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  insertDisease(disease: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, disease);
  }

  updateDisease(disease: any): Observable<any> {
    const url = `${this.apiUrl}/${disease.sno}`;
    return this.http.put<any>(url, disease);
  }

  deleteDisease(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
