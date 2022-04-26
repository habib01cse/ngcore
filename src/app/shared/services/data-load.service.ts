import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { sharedConfig } from '../shared.config';

const API_URL = sharedConfig.url.apiUrl + 'core/data-load';
const DWN_URL = sharedConfig.url.apiUrl + 'core/data-load/download';
const DWN_XLS_URL = sharedConfig.url.apiUrl + 'core/file/remote';
const GEN_XLS_RPT = sharedConfig.url.apiUrl + 'core/xls-report/generate';

@Injectable({
  providedIn: 'root'
})
export class DataLoadService {
  constructor(private http: HttpClient, private apiService: BaseDataService) { }

  load(functionName: string, params?: any, type?: boolean) {
    return this.loadData(functionName, params, type ? 'map' : null);
  }

  private loadData(functionName: string, params?: any, type?: string) {
    return this.apiService.save<any>(API_URL + '/' + functionName + (type ? ('/' + type) : ''), params ? params : JSON.parse('{}'));
  }

  download(functionName: string, params?: any, type?: string) {

    if (type=== "XLSX" ){
      return this.apiService.download<any>(DWN_URL + '/' + functionName, params ? params : JSON.parse('{}'));
    } else{
      return this.loadData(functionName, params, type ? 'map' : null);
    }
    
  }

  genExcelReport(params?: any) {
    return this.apiService.download<any>(GEN_XLS_RPT, params ? params : JSON.parse('{}'));
  }

  downloadXlxs(url: string, type?: string) {    
    return this.apiService.xlsxDownload<any>(DWN_XLS_URL + '/' + type, url);   
  }

  

}
