import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1114';

  constructor(private dataLoadService: DataLoadService) { }

  // getVoucherDtls
  public getDataByPostStatus(STATUS, LEVEL, START_DATE, END_DATE): any {
    let paramObj = {
      P_REQ_STDATE: START_DATE,
      P_REQ_ENDDATE: END_DATE,
      P_POST_STATUS: STATUS == 2 ? null : STATUS,
      P_ITEM_LIST: LEVEL,
    };
    return this.dataLoadService.load("FG_AC1114_GET_DATA_BY_POST_STS", paramObj)
  }

}
