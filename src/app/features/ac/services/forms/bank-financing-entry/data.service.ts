import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1060';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getBankLoans
  public getBankLoans(BANKLOAN_NO) {
    let paramObj = {
      P_BANKLOAN_NO: BANKLOAN_NO
    }
    let promises = [
      this.dataLoadService.load("FG_AC1060_GET_BANK_LOAN_NO", paramObj, true),
      this.dataLoadService.load("FG_AC1060_GET_BANK_DTL_INFO", paramObj),
    ]
    return forkJoin(promises)
  }

  // getLoanCalculation
  public getLoanCalculation(START_DATE, PRINCIPAL_AMOUNT, ANNUAL_INT_RATE, LOAN_PERIOD, INTEREST_TYPE, NO_OF_PAY_PER_YEAR) {
    let paramObj = {
      P_LOAN_ST_DATE: START_DATE,
      P_PRINCIPAL_AMT: PRINCIPAL_AMOUNT,
      P_ANNUAL_INT_RATE: ANNUAL_INT_RATE,
      P_LOAN_PERIOD: LOAN_PERIOD,
      P_INTEREST_TYPE: INTEREST_TYPE,
      P_NO_OF_PAY_PER_YEAR: NO_OF_PAY_PER_YEAR,
    }
    return this.dataLoadService.load("FG_AC1060_GET_LOAN_CALCULATION", paramObj);
  }

  // getBankLoans
  public saveBankLoans(bankLoan) {
    return this.apiService.save<any>(`${this.serverPath}/save-bank-loans`, bankLoan);
  }

}
