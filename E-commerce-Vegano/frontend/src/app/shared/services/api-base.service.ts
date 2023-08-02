import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '@environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {


  private _urlBase: string = BASE_URL;

  private http = inject(HttpClient);

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this._urlBase + path);
  }

  post<T>(path: string, body: object): Observable<T> {
    return this.http.post<T>(this._urlBase + path, body);
  }

  put<T>(path: string, body: object): Observable<T> {
    return this.http.put<T>(this._urlBase + path, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this._urlBase + path);
  }

}
