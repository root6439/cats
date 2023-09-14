import { Pagination } from './../shared/models/Pagination.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../shared/models/Cat.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Race } from '../shared/models/Race';
import { PutCatRequest } from '../shared/models/cats/PutCatRequest.model';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private serverUrl = `${environment.serverUrl}/cats`;

  constructor(private http: HttpClient) {}

  getCats(
    searchValue: string,
    page: number = 1,
    offset: number = 5
  ): Observable<Pagination<Cat>> {
    let httpParams = new HttpParams({
      fromObject: { search: searchValue, page, offset },
    });

    return this.http.get<Pagination<Cat>>(this.serverUrl, {
      params: httpParams,
    });
  }

  postCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.serverUrl, cat);
  }

  getCatById(id: string): Observable<Cat> {
    return this.http.get<Cat>(`${this.serverUrl}/${id}`);
  }

  putCat(id: string, cat: PutCatRequest): Observable<Cat> {
    return this.http.put<Cat>(`${this.serverUrl}/${id}`, cat);
  }

  deleteCat(id: string) {
    return this.http.delete(`${this.serverUrl}/${id}`);
  }

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.serverUrl}/races`);
  }
}
