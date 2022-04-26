import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1010';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getDefaultDuties
  public getDefaultDuties(): any {
    return this.dataLoadService.load("FG_AC1010_GET_DEFAULT_DUTIES", JSON.parse('{}'), true)
  }

  // getVoucherPreparedBy
  public getVoucherPreparedBy() {
    return this.dataLoadService.load("FG_AC1010_VOUCHER_PREPARE_BY")
  }

  // getVouchers
  public getVouchers(params: any): any {
    return this.dataLoadService.load("FG_AC1010_GET_VOUCHER", params)
  }

  // getVoucherDtls
  public getVoucherDtls(voucherId: number): any {
    let paramObj = {
      P_V_NO: voucherId
    };
    return this.dataLoadService.load("FG_AC1010_GET_VOUCHER_DTL", paramObj)
  }

  // saveUnpostedTransaction
  public saveUnpostedTransaction(entity: any): any {
    return this.apiService.save<any>(`${this.serverPath}/save-unposted-transaction`, entity);
  }

  //POST /ac/ac1010/save-voucher-dtl
  public saveVoucherDtl(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-voucher-dtl`, params);
  }
  

}
