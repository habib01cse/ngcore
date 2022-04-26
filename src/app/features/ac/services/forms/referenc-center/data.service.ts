import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1040';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getChartofAccount
  public getBusinessUnits(SEARCH_NAME: any): any {
    let params = {
      P_SEARCH_NAME: SEARCH_NAME
    }
    return this.dataLoadService.load("FG_AC1040_GET_BUSSINESS_UNITS", params);
  }

  // getCostCenterByRefNO 
  public RefCompanyList(REF_NO: any): any {
    let params = { P_REF_NO: REF_NO }
    return this.dataLoadService.load("FG_AC1040_COST_CENTER_BY_REFNO", params,true)
  }




  // getParentBU 
  public getParentBU(): any {
    return this.dataLoadService.load("FG_AC1040_PARENT_BU");
  }

  // getReferenceInvoice 
  public getReferenceInvoice(): any {
    return this.dataLoadService.load("FG_AC1040_REFERENCE_INVOICE");
  }

  // getReferenceInvoicePI 
  public getReferenceInvoicePI(): any {
    return this.dataLoadService.load("FG_AC1040_REFERENCE_INVOICE_PI");
  }

  // saveCostCenter
  public saveCostCenter(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-reference`, params);
  }

}