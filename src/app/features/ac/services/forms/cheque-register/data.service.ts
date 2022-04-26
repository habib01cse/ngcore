import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1023';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    //  // getRepositoryDetails
    //  public getRepositoryDetails(RP_NO): any {
    //     let paramObj = {
    //         RP_NO: RP_NO
    //     };
    //     return this.apiService.executeQuery<any>(`${this.serverPath}/get-repository-details`, paramObj);
    // }

    getChequesbyFilter(CHECKBOOK_ID, CHECK_ALL, CHECK_STAT_NO, CKDT_FROM, CKDT_TO, PREDT_FROM, PREDT_TO, VOIDFLG, RB_POST, PAY_ACC_NO, CHEQUE_NO, CHEQUE_NO_ALL) {
        let paramObj = {
            CHECKBOOK_ID: CHECKBOOK_ID,
            CHECK_ALL: CHECK_ALL,
            CHECK_STAT_NO: CHECK_STAT_NO,
            CKDT_FROM: CKDT_FROM,
            CKDT_TO: CKDT_TO,
            PREDT_FROM: PREDT_FROM,
            PREDT_TO: PREDT_TO,
            VOIDFLG: VOIDFLG,
            RB_POST: RB_POST,
            PAY_ACC_NO: PAY_ACC_NO,
            CHEQUE_NO: CHEQUE_NO,
            CHEQUE_NO_ALL: CHEQUE_NO_ALL,
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/getCheques`, paramObj);
    }
    getCheques(CHECKBOOK_ID) {
        let paramObj = {
            P_CHECKBOOK_ID: CHECKBOOK_ID
        };
        return this.dataLoadService.load("FG_AC1023_GET_CHEQUES", paramObj)
    }
    getChequeAutho() {
        return this.dataLoadService.load("FG_AC1023_GET_CHEQUE_AUTHO")
    }
    saveChequeAuth(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-cheque-auth`, paramObj);
    }
    getChequePrepared(CHEQUE_NO) {
        let paramObj = {
            P_CHECK_NO: CHEQUE_NO
        };
        return this.dataLoadService.load("FG_AC1023_CHEQUE_PREPARED", paramObj)
    }

    getChequeType() {
        return this.dataLoadService.load("FG_AC1023_CHEQUE_AUTHO_BY_NO")
    }
    saveChequeStat(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-cheque-stat`, paramObj);
    }

    // Create Cheque
   
    createCheque(FINAL_SETTLEMENT_TYPE, FINAL_SETTLEMENT_DATE, V_NO, VOUCHERTYPE_NO, CHECKBOOK_ID, CHEQUE_NO,CHECK_ID,STATUS, VOID_FLG, SUM_AMT,MANUAL_FLG,       
        EXCHANGE_RATE, ACTIVE_STATE, COST_NO, BA_NO, SIGNATORY_EMP_NO, CUR_NO, CHECK_STAT_NO, CHECK_DATE, CHECK_AMT, PREPARE_DATE, DESCR, CHEQUE_COMPANY_NO, PAY_TO_ACC_CHK,TTL_AMOUNT_CHK, POST_DATE, GL_POST) 
        {
        let paramObj = {
            FINAL_SETTLEMENT_TYPE: FINAL_SETTLEMENT_TYPE,
            FINAL_SETTLEMENT_DATE: FINAL_SETTLEMENT_DATE,
            V_NO: V_NO,
            VOUCHERTYPE_NO: VOUCHERTYPE_NO,
            CHECKBOOK_ID: CHECKBOOK_ID,
            CHEQUE_NO: CHEQUE_NO,
            CHECK_ID: CHECK_ID,
            STATUS: STATUS,
            VOID_FLG: VOID_FLG,
            SUM_AMT: SUM_AMT,
            MANUAL_FLG: MANUAL_FLG,
            EXCHANGE_RATE: EXCHANGE_RATE,
            ACTIVE_STATE: ACTIVE_STATE,
            COST_NO: COST_NO,
            BA_NO: BA_NO,
            SIGNATORY_EMP_NO: SIGNATORY_EMP_NO,
            CUR_NO: CUR_NO,
            CHECK_STAT_NO: CHECK_STAT_NO,
            CHECK_DATE: CHECK_DATE,
            CHECK_AMT: CHECK_AMT,
            PREPARE_DATE: PREPARE_DATE,
            DESCR: DESCR,
            CHEQUE_COMPANY_NO: CHEQUE_COMPANY_NO,
            PAY_TO_ACC_CHK: PAY_TO_ACC_CHK,
            TTL_AMOUNT_CHK: TTL_AMOUNT_CHK,
            POST_DATE: POST_DATE,
            GL_POST: GL_POST,
        };
      
        return this.apiService.executeQuery<any>(`${this.serverPath}/create-cheque`, paramObj);
    }

    // Save Cheque Register
    saveChequeRegister(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-cheque-reg`, paramObj);
    }

    // save-bill-check
    saveBillCheck(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-bill-check`, paramObj);
    }

    //POST /ac/ac1023/save-money-check-pay
    saveMoneyCheckPay(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-money-check-pay`, paramObj);
    }

    // POST /ac/ac1023/save-service-check-pay
    saveServiceCheckPay(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-service-check-pay`, paramObj);
    }

    // Pre Updating
    preUpdating(POST_DATE, V_NO) {
        let paramObj = {
            POST_DATE: POST_DATE,
            V_NO: V_NO
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/pre-updating`, paramObj);
    }

    // Opening Balance 
    getOpBalance(START_DATE, END_DATE, ACC_NO) {
        let paramObj = {
            START_DATE: START_DATE,
            END_DATE: END_DATE,
            ACC_NO: ACC_NO,
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-op-balance`, paramObj);
    }

    //POST /ac/ac1023/save-cheque-print
    saveChequePrint(paramObj) {
        return this.apiService.save<any>(`${this.serverPath}/save-cheque-print`, paramObj);
    }


    // GL Post
    postVoucher(FINAL_SETTLEMENT_TYPE, FINAL_SETTLEMENT_DATE, VOUCHERTYPE_NO, CHECKBOOK_ID, CHEQUE_NO,CHECK_ID,
        VOID_FLG,MANUAL_FLG,  EXCHANGE_RATE, ACTIVE_STATE, COST_NO, BA_NO, CUR_NO,CUR_NAME, CHECK_STAT_NO, 
            CHECK_STATUS, CHECK_DATE,
            CHECK_AMT, PREPARE_DATE, DESCR, CHEQUE_COMPANY_NO, PAY_TO_ACC_NO,PAY_TO_ACC_NO_NAME, POST_DATE, GL_POST) {
        let paramObj = {
            FINAL_SETTLEMENT_TYPE: FINAL_SETTLEMENT_TYPE,
            FINAL_SETTLEMENT_DATE: FINAL_SETTLEMENT_DATE,          
            VOUCHERTYPE_NO: VOUCHERTYPE_NO,
            CHECKBOOK_ID: CHECKBOOK_ID,
            CHEQUE_NO: CHEQUE_NO,
            CHECK_ID: CHECK_ID,
            
            VOID_FLG: VOID_FLG,           
            MANUAL_FLG: MANUAL_FLG,
            EXCHANGE_RATE: EXCHANGE_RATE,
            ACTIVE_STATE: ACTIVE_STATE,
            COST_NO: COST_NO,
            BA_NO: BA_NO,           
            CUR_NO: CUR_NO,
            CUR_NAME: CUR_NAME,
            CHECK_STAT_NO: CHECK_STAT_NO,
            CHECK_STATUS: CHECK_STATUS,
            CHECK_DATE: CHECK_DATE,
            CHECK_AMT: CHECK_AMT,
            PREPARE_DATE: PREPARE_DATE,
            DESCR: DESCR,
            CHEQUE_COMPANY_NO: CHEQUE_COMPANY_NO,
           // PAY_ACC_NO: PAY_ACC_NO,
           //PAY_TO_ACC_NO: PAY_TO_ACC_NO,
           //PAY_TO_ACC_NO_NAME: PAY_TO_ACC_NO_NAME,

            POST_DATE: POST_DATE,
            GL_POST: GL_POST,
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/proc-post-voucher`, paramObj);
    }

}
