import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { sharedConfig } from '../shared.config';
const API_URL = sharedConfig.url.apiUrl + 'core/common/';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http: HttpClient, private apiService: BaseDataService) {}
  getNavs( paramObj ) {
    return this.apiService.executeQuery<any>(`${API_URL}get-menu`, paramObj);
  }

  changeCompany(companyNo) {
    const paramObj = { COMPANY_NO: companyNo };
    return this.apiService.executeQuery<any>(`${API_URL}change-company`, paramObj);
  }
}
