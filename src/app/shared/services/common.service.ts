import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { sharedConfig } from '../shared.config';

const API_URL = sharedConfig.url.apiUrl + 'hr/common/';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient, private apiService: BaseDataService) { }  
  getCompanies() {
    return this.apiService.executeQuery<any>(`${API_URL}get-companies`);
  }
  getLineList(companyNo) {
    const paramObj = { COMPANY_NO: companyNo };
    return this.apiService.executeQuery<any>(`${API_URL}get-all-lines`, paramObj);
  }
  getBusinessUnits() {
    return this.apiService.executeQuery<any>(`${API_URL}get-business-units`);
  }
  getElementList() {
    return this.apiService.executeQuery<any>(`${API_URL}get-elements`);
  }

  getHrTypes() {
    return this.apiService.executeQuery<any>(`${API_URL}get-hr-types`);
  }
  getJobTypes() {
    return this.apiService.executeQuery<any>(`${API_URL}get-job-types`);
  }
  getJobTitles() {
    return this.apiService.executeQuery<any>(`${API_URL}get-job-titles`);
  }
   getEmpTypes() {
    return this.apiService.executeQuery<any>(`${API_URL}get-employee-types`);
  }
  getEmployeeList() {
    return this.apiService.executeQuery<any>(`${API_URL}get-all-employees-short`);
  }
  getJobLocations() {
    return this.apiService.executeQuery<any>(`${API_URL}get-job-locations`);
  }
  getFsTypes() {
    return this.apiService.executeQuery<any>(`${API_URL}get-f-s-types`);
  }

}
