import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverUrl = `${environment.serverUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(search: string = ''): Observable<User[]> {
    let params = new HttpParams({ fromObject: { search } });

    return this.http.get<User[]>(this.serverUrl);
  }
}
