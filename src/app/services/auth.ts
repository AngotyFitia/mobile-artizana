import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:2222';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(`${this.baseUrl}/login-mobile`, body.toString(), { headers, withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout-mobile`, {
      withCredentials: true,
      responseType: 'text' // très important si backend retourne une string ou rien
    });
  }
  

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/session`, { withCredentials: true });
  }
  
}
