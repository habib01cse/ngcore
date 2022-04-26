import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1022';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    // getRepositoryDetails
    public getRepositoryDetails(RP_NO): any {
        let paramObj = {
            RP_NO: RP_NO
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-repository-details`, paramObj);
    }

    createChequeSetup(CHECKBOOK_ID, BANK_ACC_NO, CHECK_COUNT, FIRST_CHEQUE_NO, VTYPE_NO, STATUS,ALIAS) {
        let paramObj = {
            CHECKBOOK_ID: CHECKBOOK_ID,
            BANK_ACC_NO: BANK_ACC_NO,
            CHECK_COUNT: CHECK_COUNT,
            FIRST_CHEQUE_NO: FIRST_CHEQUE_NO,
            VTYPE_NO: VTYPE_NO,
            STATUS: STATUS,
            ALIAS: ALIAS,
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/create-cheque-set-up`, paramObj);
    }

    // getChequeBookList
    public getChequeBookList(CHECKBOOK_ID): any {
        let paramObj = {
            P_CHECKBOOK_ID: CHECKBOOK_ID
        };
        return this.dataLoadService.load("FG_AC1022_CHEQUE_BOOK_LIST", paramObj)
    }

    // getChequeBookList
    public removeChequeBookList(BANK_ACC_NO, CHECKBOOK_ID): any {
        let paramObj = {
            BANK_ACC_NO: BANK_ACC_NO,
            CHECKBOOK_ID: CHECKBOOK_ID
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/remove-cheque`, paramObj);
    }

    // saveChequeSetUp
    public saveChequeSetUp(chequeSetUpList): any {
        return this.apiService.save<any>(`${this.serverPath}/save-check-set-up`, chequeSetUpList);
    }

}
