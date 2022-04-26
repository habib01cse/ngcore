import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from 'src/app/features/ac/ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';
const _url = acConfig.url.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  
  public save(paramObj: any) {
    return this.apiService.save<any>(`${_url}ac1134/save-money-payment-schedule`, paramObj);
  }
  

  public delete() {
    return this.apiService.executeQuery<any>(`${_url}ac1134/delete-money-payment-schedule`);
  }


}
