import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1107';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(BILL_TYPE, PAID_STATUS, AUDIT_STATUS, CHECK_VOUCHER, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE) {
    let paramObj = {
      P_BILL_TYPE:BILL_TYPE == 2 ? null : BILL_TYPE,
      P_PAID_STATUS:PAID_STATUS == 1 ? null : PAID_STATUS,
      P_AUDIT_STATUS:AUDIT_STATUS == 2 ? null : AUDIT_STATUS,
      P_POST_STATUS:CHECK_VOUCHER == 2 ? null : CHECK_VOUCHER,
      P_ACC_MAP: ACCOUNT_MAP,
      P_COST_MAP: COST_MAP,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      G_SESSION_NO: null
    };
    return this.dataLoadService.load("FG_AC1107_GET_DATA_BY_POST_STS",paramObj);
  }
  public createVoucher(BILL_NO, SUPPLIER_NO, INVOICE_VALUE,POST_FLAG, V_NO,GL_POST_ENTRY_DATE,GL_POSTDATE) {


    let paramObj = {
      BILL_NO: BILL_NO,
      SUPPLIER_NO: SUPPLIER_NO,
      INVOICE_VALUE: INVOICE_VALUE,
      POST_FLG: POST_FLAG,
      V_NO:V_NO,
      GL_POST_ENTRY_DATE:GL_POST_ENTRY_DATE,
      GL_POST_DATE:GL_POSTDATE,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/create-voucher`, paramObj);
  }
}
