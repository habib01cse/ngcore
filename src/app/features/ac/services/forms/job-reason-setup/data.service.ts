import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1057';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // saveJobReason
  public saveJobReason(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-job-reason`, params);
  }

  

}
