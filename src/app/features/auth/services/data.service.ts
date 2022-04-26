import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { authConfig } from '../auth.config';
const _url = authConfig.url.apiUrl+'core/auth/';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  attemptAuth(username: string, password: string, company): Observable<any> {
    const body = new HttpParams()
      .set('USER_NAME', username)
      .set('PASSWORD', password)
      .set('COMPANY_NO', company);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(_url+'login', body.toString(), {headers});    
  }

  attemptFakeAuth(ussername: string, password: string) {
    return "fakeToken";
  }

  getCompanyList( username: string ): Observable<any> {
    const body = new HttpParams()
      .set('USER_NAME', username);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(_url+'companies', body.toString(), {headers});
  }
}
