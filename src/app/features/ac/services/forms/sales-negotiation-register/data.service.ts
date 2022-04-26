import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1104';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(START_DATE,END_DATE,STATUS,LEVEL,COST_MAP) {
    let paramObj = {
      P_REQ_STDATE: START_DATE,
      P_REQ_ENDDATE: END_DATE,
      P_POST_STATUS: STATUS == 2 ? null : STATUS,
      P_ITEM_LIST: LEVEL,
      P_COST_MAP:COST_MAP,
    };
    return this.dataLoadService.load("FG_AC1104_GET_DATA_BY_POST_STS", paramObj);
  }
}
