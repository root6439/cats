import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../shared/models/Cat.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private serverUrl = `${environment.serverUrl}/cats`;

  constructor(private http: HttpClient) {}

  getCats(searchValue: string): Observable<Cat[]> {
    let httpParams = new HttpParams({ fromObject: { search: searchValue } });

    return this.http.get<Cat[]>(this.serverUrl, { params: httpParams });
  }

  postCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.serverUrl, cat);
  }

  getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(`${this.serverUrl}/${id}`);
  }

  putCat(id: number, cat: Cat): Observable<Cat> {
    return this.http.put<Cat>(`${this.serverUrl}/${id}`, cat);
  }

  deleteCat(id: number) {
    return this.http.delete<void>(`${this.serverUrl}/${id}`);
  }

  patchCat() {}
}
