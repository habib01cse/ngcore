import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { Subscriber, forkJoin } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1003';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    // getTreeBankNames
    public getTreeBankNames(): any {
        return this.dataLoadService.load("FG_AC1003_TREE_BANK_NAMES")
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-tree-bank-names`);
    }

    // getDistricts
    public getDistricts(): any {
        return this.dataLoadService.load("FG_AC1003_DISTRICT_LIST");
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-districts`);
    }

    // getAccountTypes
    public getAccountTypes(): any {
        return this.dataLoadService.load("FG_AC1003_ACCOUNT_TYPES")
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-account-types`);
    }

    // getGLAccounts
    public getGLAccounts(): any {
        return this.dataLoadService.load("FG_AC1003_GL_ACCOUNT")
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-gl-accounts`);
    }

    // getSalesAccounts
    public getSalesAccounts(): any {
        return this.dataLoadService.load("FG_AC1003_SALES_ACCOUNT")
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-sales-accounts`);
    }


    // getBanksInfo
    public getBanksInfo(_BANK_NO: any): any {
        let params = { P_BANK_NO: _BANK_NO }
        let promises = [
            this.dataLoadService.load("FG_AC1003_GET_BANK", params, true),
            this.dataLoadService.load("FG_AC1003_GET_BANK_DETAILS", params)
        ]
        return forkJoin(promises)
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-bank`, params);
    }

    // getBankDetails
    public getBankDetails(_BANK_NO: any): any {
        let params = { BANK_NO: _BANK_NO }
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-bank-details`, params);
    }

    // saveBank
    public saveBank(params): any {
        return this.apiService.save<any>(`${this.serverPath}/save-bank`, params);
    }
    // saveBank
    public removeBank(BANK_NO): any {
        let params = { BANK_NO: BANK_NO }
        return this.apiService.executeQuery<any>(`${this.serverPath}/remove-bank`, params);
    }

}
