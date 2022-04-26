/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DataService } from './data.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { FormParam } from '../../../models/form-param';
import { BankReconciliation } from '../../../models/bank-recounsile.model';
import { BankReconciled } from '../../../models/bank-recounsiled.model';
import { DateService } from 'src/app/shared';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { GridService } from 'src/app/shared/services/grid.service';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    public selectedVoucher = null;
    public voucherTypeList = [];
    bankNameList = [];
    formParam: FormParam;
    bankReconciliation: BankReconciliation;
    bankRecounciled: BankReconciled;
    bankReconciliationList: BankReconciliation[] = new Array<BankReconciliation>();
    bankReconciliationListBackUp: BankReconciliation[] = new Array<BankReconciliation>();
    selectednNarration: string = ''; 
    userPrivilege = new UserPrivileges();

    SETTLEMENT_TK = null;

    constructor(private apiService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        public gridService: GridService,
        private dateUtil: DateService) {
        this.bankReconciliation = new BankReconciliation();
        this.bankReconciliationList = new Array<BankReconciliation>();
        this.formParam = new FormParam();
        this.voucherTypeList = fixedValues.voucherType2;
    }

    init() {
       
        this.formParam.FORM_ID = 'AC_1014'
        this.bankRecounciled = new BankReconciled();
        let promiseAll = [
            this.commonService.getChartOfAccounts(fixedValues.queryOptions.CoaForTSBR),
            this.commonService.getUserPrivileges(this.formParam.FORM_ID)
        ];
        forkJoin(promiseAll).subscribe(results => {
            this.bankNameList = results[0].body;
            this.userPrivilege = new UserPrivileges(results[1].body)
        });
    }

    
    getBankReconciliation(START_DATE: any, END_DATE: any, START_BANK_DATE: any, END_BANK_DATE: any, FLAG_CHK,  ACC_NO: any, POSTING_TYPE): any {
        this.bankReconciliationList = [];
        this.apiService.getBankReconciliation(START_DATE, END_DATE, START_BANK_DATE, END_BANK_DATE, FLAG_CHK, ACC_NO, POSTING_TYPE).subscribe(result => {
            //this.grid.api.setRowData(result.body);
            result.body.forEach(element => {
                this.bankReconciliationList.push(new BankReconciliation(element));
            });
            this.bankReconciliationListBackUp = JSON.parse(JSON.stringify(this.bankReconciliationList));
        },
            err => {
                this.displayError(err)
            },
            () => {
                // Do stuff after completion
            })
    }

    private displayError(ex): void {
        console.log(ex);
    }

    bankOutputBalance(POSTING_STATUS, ACC_NO, START_DATE, END_DATE, START_BANK_DATE: any, END_BANK_DATE: any, FLAG_CHK: any ): any {
        this.apiService.getBankReconciled(POSTING_STATUS, ACC_NO, START_DATE, END_DATE, START_BANK_DATE, END_BANK_DATE, FLAG_CHK).subscribe(result => {
            this.bankRecounciled = new BankReconciled(result.body);
            this.getBankReconciliation(
                this.formParam.START_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.START_DATE) : null,
                this.formParam.END_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_DATE) : null,
                this.formParam.START_BANK_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.START_BANK_DATE) : null,
                this.formParam.END_BANK_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_BANK_DATE) : null,
                FLAG_CHK,

                this.formParam.ACC_NO,
                this.selectedVoucher);
        })
    }

    updatedBankSave(): any {
        this.apiService.updateBank(this.bankReconciliationList).subscribe(result => {
            this.bankReconciliationListBackUp = JSON.parse(JSON.stringify(this.bankReconciliationList));
            this.alertService.success("Bank Reconciliation saved successfully");
        }, err => {
            console.log('err', err)
            this.alertService.warning("Failed to save Bank Reconciliation!");
        },
            () => {

            })
    }

}
