import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1014';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }


    // getBankReconciliation(
    public getBankReconciliation(START_DATE, END_DATE, START_BANK_DATE, END_BANK_DATE, FLAG_CHK, ACC_NO, VTYPE_NO ): any {
        let paramObj = {
            P_START_DATE: START_DATE ? START_DATE : null,
            P_END_DATE: END_DATE ? END_DATE : null,
            P_START_BANK_DATE: START_BANK_DATE ? START_BANK_DATE : null,
            P_END_BANK_DATE: END_BANK_DATE ? END_BANK_DATE : null,         
            P_BANK_ACC_NO: ACC_NO ? ACC_NO : null,           
            P_VTYPE: VTYPE_NO ? VTYPE_NO : 'A',
            P_CHK: FLAG_CHK ? FLAG_CHK : 0
        };
        return this.dataLoadService.load("FG_AC1014_BANK_RECONCILIATION", paramObj)
    }

    public getBankReconciled(POSTING_STATUS, ACC_NO, START_DATE, END_DATE, START_BANK_DATE, END_BANK_DATE, FLAG_CHK) {
        let paramObj = {
            REC_TYPE: POSTING_STATUS ? POSTING_STATUS : null,
            BANK_NO: ACC_NO ? ACC_NO : null,
            START_DATE: START_DATE ? START_DATE : null,
            END_DATE: END_DATE ? END_DATE : null,
            START_BANK_DATE: START_BANK_DATE ? START_BANK_DATE : null,
            END_BANK_DATE: END_BANK_DATE ? END_BANK_DATE : null,
            FLAG_CHK: FLAG_CHK ? FLAG_CHK : 0,
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/bank-reconciled`, paramObj);
    }

    public updateBank(bank) {
        return this.apiService.save<any>(`${this.serverPath}/save-bank-reconciliation`, bank);
    }

    public ProcGetBalanceQuery(  START_DATE, END_DATE,ACC_NO) {
        let paramObj = {          
           
            START_DATE: START_DATE ? START_DATE : null,
            END_DATE: END_DATE ? END_DATE : null,
            ACC_NO: ACC_NO ? ACC_NO : null
          
            
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/proc-balance-query`, paramObj);
    }


}
