import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1021';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getDefaultDuties
  public getDefaultDuties(): any {
    return this.dataLoadService.load("FG_AC1021_GET_DEFAULT_DUTIES",JSON.parse('{}'),true)
  }

  // getVouchers
  public getVouchers(params: any): any {
    return this.dataLoadService.load("FG_AC1021_GET_VOUCHER", params)
  }

  // getVoucherDtls
  public getVoucherDtls(voucherId: number): any {
    let paramObj = {
      P_V_NO: voucherId
    };
    return this.dataLoadService.load("FG_AC1021_GET_VOUCHER_DETAIL", paramObj)
  }

  // getVoucherPreparedBy
  public getVoucherPreparedBy(paramObj: any) {
    return this.dataLoadService.load("FG_AC1021_VOUCHER_PREPARE_BY", paramObj)
  }

  // saveTransactionChecking
  public saveTransactionChecking(entity: any): any {
    return this.apiService.save<any>(`${this.serverPath}/save-transaction-checking`, entity);
  }

  //POST /ac/ac1021/save-voucher-dtl
  public saveVoucherDtl(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-voucher-dtl`, params);
  }


}
