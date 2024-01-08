import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://127.0.0.1:5000/data/';
  constructor( private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const data = {
      email: username,
      password: password
    }

    return this.http.post(this.baseUrl + 'login', data);
  }

  registo(username: string, password: string,password2: string): Observable<any> {
    const data = {
      email: username,
      password: password,
      password2: password2
    }

    return this.http.post(this.baseUrl + 'registro', data);
  }
}
