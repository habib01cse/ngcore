import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1117';

  constructor(private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(LEVEL, LC_TYPE, ACCEPT_STATUS, PAYMENT_STATUS, POST_STATUS, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE) {
    let paramObj = {
      P_ITEM_LIST: LEVEL,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,      
      P_LC_TYPE: LC_TYPE,
      P_ACCEPT_STATUS: ACCEPT_STATUS,
      P_PAYMENT_STATUS: PAYMENT_STATUS, 
      P_POST_STATUS: POST_STATUS,      
      P_ACC_MAP: ACCOUNT_MAP,
      P_COST_MAP: COST_MAP,      
    };
    return this.dataLoadService.load("FG_AC1117_GET_DATA_BY_POST_STS", paramObj);
  }
}
