import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1128';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(STATUS, START_DATE, END_DATE, CUSTOMER_MAP, COST_MAP) {
    let paramObj = {
      STATUS: STATUS == 0 ? null : STATUS,
      START_DATE: START_DATE,
      END_DATE: END_DATE,
      CUSTOMER_MAP: CUSTOMER_MAP,
      COST_MAP: COST_MAP,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-data-by-post-status`, paramObj);
  }

  // Get Search Data
  public getContact(CONTRACT_NO) {
    let paramObj = {
      P_CONTRACT_NO: CONTRACT_NO
    };
    return this.dataLoadService.load(" FG_AC1128_GET_CONTRACT", paramObj)
    // return this.apiService.executeQuery<any>(`${this.serverPath}/get-contract`, paramObj);
  }

  // Get Search Data
  public getNegotiation(NEGOTIATION_NO) {
    let paramObj = {
      P_NEGOTIATION_NO: NEGOTIATION_NO
    };
    let promises = [
      this.dataLoadService.load("FG_AC1128_GET_NEGOTIATIONS", paramObj,true),
      this.dataLoadService.load("FG_AC1128_FUND_DISTRIBUTION", paramObj),
    ]
    return forkJoin(promises);
  }

  // Get Search Data
  public saveNegotiaonData(obj) {
    let paramObj = obj;
    return this.apiService.save<any>(`${this.serverPath}/save-negotiation`, paramObj);
  }

  // getBankDocSetup
  public getFundDistributionByFundD(FUND_DISTRIBUTION_NO) {
    let paramObj = {
      P_FUND_DISTRIBUTION_NO: FUND_DISTRIBUTION_NO
    }
    return this.dataLoadService.load("FG_AC1128_FUND_DISTR_BY_FUND", paramObj);
  }
  // updateNegotiation
  public updateNegotiation(POST_DATE, NEGOTIATION_NO) {
    let paramObj = {
      POST_DATE: POST_DATE,
      NEGOTIATION_NO: NEGOTIATION_NO
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-negotiation`, paramObj);
  }

  // removeNegoFund
  public removeNegoFund(NEGOTIATION_NO) {
    let paramObj = {
      NEGOTIATION_NO: NEGOTIATION_NO
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-nego-fund`, paramObj);
  }
  // updateNegotiation
  public updateNegotiationByNO(NEGOTIATION_NO) {
    let paramObj = {
      NEGOTIATION_NO: NEGOTIATION_NO
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-negotiation-by-nego-no`, paramObj);
  }
  // Remove Negotiation 
  public removeNegotiation(NEGOTIATION_NO) {
    let paramObj = {
      NEGOTIATION_NO: NEGOTIATION_NO,
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-negotiation`, paramObj);
  }

}
