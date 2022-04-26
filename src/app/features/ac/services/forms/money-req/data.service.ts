import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1131';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(ITEM_LIST, START_DATE, END_DATE, APP_STATUS) {

    if (APP_STATUS == null) {

      APP_STATUS = 'E';
    }

    if (ITEM_LIST == null) {

      ITEM_LIST = 1;
    }
   
    let paramObj = {
    
      P_ITEM_LIST: (ITEM_LIST),      
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_APP_STATUS: (APP_STATUS),
      P_SUBMENU_ID: 'AC_1131',
      P_GROUP_FLAG: 0,
      P_APP_PROCESSTYPE_NO: 5032000006     
    };
    return this.dataLoadService.load("FG_AC1131_MONEYREQ",paramObj);
  }
  public procApproveFlag(MONEYREQ_NO, APPSET_NO, STATUS_NO, REQ_FROM, GROUP_FLAG, REMARKS
    ,GRAND_TOTAL,COMPANY_NO) {
    let paramObj = {
      MONEYREQ_NO: MONEYREQ_NO,   
      APPSET_NO: APPSET_NO,
      STATUS_NO: STATUS_NO,   
      REQ_FROM: REQ_FROM,
      GROUP_FLAG: GROUP_FLAG,   
      REMARKS: REMARKS,
      GRAND_TOTAL: GRAND_TOTAL,   
      COMPANY_NO: COMPANY_NO,  
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/proc-approve-req`, paramObj);
  }
}
