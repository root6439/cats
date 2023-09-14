import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../shared/models/Auth.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${environment.serverUrl}/login`, {
      login,
      password,
    });
  }
}
