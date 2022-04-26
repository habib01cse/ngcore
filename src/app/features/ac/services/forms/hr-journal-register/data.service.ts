import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1101';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(START_DATE, END_DATE,STATUS,ITEM_LIST) {
    let paramObj = {
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_POST_STATUS: STATUS == 2 ? null : STATUS,
      P_ITEM_LIST:ITEM_LIST,
    };
    return this.dataLoadService.load("FG_AC1101_GET_DATA_BY_POST_STS", paramObj)
  }

}
