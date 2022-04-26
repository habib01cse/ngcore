import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { apConfig } from '../../../ap.config';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = apConfig.url.apiUrl + 'ap1004';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

 //POST /sa/sa1004/save-role
 public saveRole(params): any {   
  return this.apiService.save<any>(`${this.serverPath}/save-role`, params);
}


}
