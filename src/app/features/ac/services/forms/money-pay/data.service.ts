import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from "../../../ac.config";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1282';

  constructor(private apiService: BaseDataService) { }

  
  public moneyPaymentSave(obj) {
    return this.apiService.save<any>(`${this.serverPath}/save-money-payment`, obj);
  }
  
  //POST /ac/ac1282 /save-post-voucher
  public savePostVoucher(obj) {
    return this.apiService.save<any>(`${this.serverPath}/save-post-voucher`, obj);
  }

  // POST /gr/gr1030/remove-bill-payment
  public removeBillPayment(MONEYPAY_NO: number): any {
    let params = { MONEYPAY_NO: MONEYPAY_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-money-payment`, params);
  }



}
