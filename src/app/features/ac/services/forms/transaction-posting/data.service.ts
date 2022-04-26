import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1129';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getTrnPost
  public getTrnPost(TRN_DATE_FROM, TRN_DATE_TO, POST_FLG, BU_NO, TRNTYPE_NO, POST_BY) {
    let paramObj = {
      P_ST_DATE: TRN_DATE_FROM,
      P_END_DATE: TRN_DATE_TO,
      P_POST_TYPE: POST_FLG,
      P_BU_NO: BU_NO,
      P_TRN_TYPE: TRNTYPE_NO,
      P_POST_BY: POST_BY
    }
    return this.dataLoadService.load("FG_AC1129_GET_TRN_POST", paramObj);
  }

  // getTrnPost
  public getTrnPostByTrnNo(TRN_NO) {
    let paramObj = {
      P_TRN_NO: TRN_NO
    }
    return this.dataLoadService.load("FG_AC1129_TRN_POST_BY_TRN_NO",paramObj)
  }

  // getTrnPost
  public updatetrnDtl(paramObj) {
    return this.apiService.save<any>(`${this.serverPath}/save-trn-dtls`, paramObj);
  }

  // processPeriod
  public processPeriod(TRN_DATE_FROM, TRN_DATE_TO, POST_FLG) {
    let paramObj = {
      TRN_DATE_FROM: TRN_DATE_FROM,
      TRN_DATE_TO: TRN_DATE_TO,
      POST_FLG: POST_FLG
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/post-transaction-all`, paramObj);
  }

  // processPeriod
  public postTransaction(TRN_DATE, CURR_BU, TRN_NO, POST_FLG, POST_DATE, REF_FLAG) {
    let paramObj = {
      CURR_BU: CURR_BU,
      TRN_NO: TRN_NO,
      POST_FLG: POST_FLG,
      REF_FLAG: REF_FLAG
    }
    if(TRN_DATE) {
      paramObj['TRN_DATE'] = TRN_DATE;
    }
    if(POST_DATE) {
      paramObj['POST_DATE'] = POST_DATE;
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/post-transaction`, paramObj);
  }

}
