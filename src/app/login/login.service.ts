import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../shared/models/Auth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  serverUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(this.serverUrl, { login, password });
  }
}
