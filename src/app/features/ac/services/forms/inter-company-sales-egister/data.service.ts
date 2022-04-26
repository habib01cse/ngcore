import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1121';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getVoucherDtls
  public getDataByPostStatus(STATUS, START_DATE, END_DATE): any {
    let paramObj = {
        P_POST_STATUS: STATUS == 2 ? null : STATUS, 
        P_REQ_STDATE: START_DATE,
        P_REQ_ENDDATE: END_DATE,

       // P_REQ_STDATE
    };
    return this.dataLoadService.load("FG_AC1121_GET_DATA_BY_POST_STS",paramObj)
  }

    // Create Voucher
    public createVoucher(paramObj){
     
   
      return this.apiService.save<any>(`${this.serverPath}/create-voucher`, paramObj);
    }
    // Create Voucher
    public getData(TRN_NO){
      let paramObj = {
        P_TRN_NO:TRN_NO,
      };
      return this.dataLoadService.load("FG_AC1121_GET_DATA",paramObj);
    }

}
