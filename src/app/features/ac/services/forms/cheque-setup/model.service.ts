/* angular stuff */
import { Injectable } from '@angular/core';
import { Bank } from '../../../models/bank.model';
import { BankDtl } from '../../../models/bank-dtl.model';
import { DataService } from './data.service';


/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ReportSetUp } from '../../../models/repsetup.model';
import { ReportSetUpDetails } from '../../../models/report-set-up-details.model';
import { BankName } from '../../../models/bank-info.model';
import { ChequeBook } from '../../../models/cheque-book.model';
import { ChequeBookList } from '../../../models/cheque-book-list.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';


@Injectable({
    providedIn: 'root'
})
export class ModelService {




    bankName: BankName;
    bankNameBackup: BankName;
    chequeBook: ChequeBook;
    chequeBookBackUp: ChequeBook;
    multiCompanyList: any = [];
    bankInfoList: any = [];
    chequeList: ChequeBookList[] = new Array<ChequeBookList>();
    chequeListBackup: ChequeBookList[] = new Array<ChequeBookList>();

    reportNameList: any[];
    repSetUp: ReportSetUp;
    repSetUpDtl: ReportSetUpDetails[] = new Array<ReportSetUpDetails>();
    reportList: any[];
    bankDtlList = [];
    reportInfoList = [];
    changeValue: boolean = false;
    userPrivilege: UserPrivileges;
    MULTICOMPANY_CHART: Number;
    AUTO_CHECKBOOK_ID: Number;
    ALIAS: String;
    BANK_ACC_NO: String;
    IS_IN_ACTIVE_REASON: number=0;;

    constructor(private apiService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService) {
        this.userPrivilege = new UserPrivileges();
    }

    init() {
        this.bankName = new BankName();
        this.chequeBook = new ChequeBook();
        this.bankNameBackup = new BankName();
        this.chequeBookBackUp = new ChequeBook();

        let promiseAll = [
            this.commonService.getMultiCompanyCost(),
        ];
        forkJoin(promiseAll).subscribe(results => {

            this.multiCompanyList = results[0].body;
        });
    }

    addNewReportDtl() {
        this.repSetUp.RepositoryDtlList.push(new ReportSetUpDetails());
    }
    removeReportDtl(index, repDtl: ReportSetUpDetails) {
        if (repDtl.SQL_STATE == 1) {
            this.repSetUp.RepositoryDtlList.splice(index, 1);
        }
        else {
            repDtl.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }


    saveCheque(): any {
        this.apiService.createChequeSetup(this.chequeBook.CHECKBOOK_ID, this.bankName.BANK_ACC_NO, this.chequeBook.COUNTCKID,
            this.chequeBook.MIN_CKID, this.chequeBook.VTYPE_NO, this.chequeBook.ACTIVE_STAT,this.chequeBook.ACTIVE_STAT).subscribe(rseult => {
                // console.log('rseult', rseult)
                // alert(rseult.body.P_MSG);
                // if(typeof )

                this.apiService.getChequeBookList(this.chequeBook.CHECKBOOK_ID).subscribe(results => {

                    // this.chequeList = [];
                    // results.body.forEach(element => {
                    //     this.chequeList.push(new ChequeBookList(element));
                    // }); 
                    this.bankNameBackup = Object.assign({}, this.bankName);
                    this.chequeBookBackUp = Object.assign({}, this.chequeBook);
                    this.chequeListBackup = JSON.parse(JSON.stringify(this.chequeList));


                }, err => {
                    console.log(err, 'err');

                })
                this.alertService.success("Cheque updated successfully");
            }, error => {
                this.alertService.warning("Failed to update Cheque!");
            })
    }

    quearyChequeBook(): any {
        this.apiService.getChequeBookList(this.chequeBook.CHECKBOOK_ID).subscribe(results => {
            this.chequeList = [];
            results.body.forEach(element => {
                this.chequeList.push(new ChequeBookList(element));
            });

            //backup
            // this.chequeListBackup.length = 0;
            // this.chequeListBackup = JSON.parse(JSON.stringify(this.chequeList));
        })
    }

    removeCheckBook(): any {
        this.apiService.removeChequeBookList(this.bankName.BANK_ACC_NO, this.chequeBook.CHECKBOOK_ID).subscribe(result => {
            this.alertService.success("Cheque Book deleted successfully");
            this.chequeBook = new ChequeBook();
            this.changeValue = false;
        }, err => {
            this.alertService.warning("Failed to delete Cheque Book!");
        })
    }

    saveChequeList(): any {

        this.apiService.saveChequeSetUp(this.chequeList).subscribe(result => {
            //backup
            this.chequeListBackup.length = 0;
            this.chequeListBackup = JSON.parse(JSON.stringify(this.chequeList));
            this.alertService.success("Cheque saved successfully");
        }, error => {
            this.alertService.warning("Failed to save Cheque!");
        })
    }


    reportPreview(MENU_ID): any {

        let promiseAll = [
            this.commonService.getBkDtlNo(this.bankName.ACC_NO),
            this.commonService.getReportInfo(MENU_ID)
        ]

        forkJoin(promiseAll).subscribe(results => {
            this.bankDtlList = results[0].body;
            this.bankInfoList = results[1].body;
            this.makeReport();
        },
            err => {
                console.log('err', err);
            })
    }

    makeReport() {
        let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
        let subPart = X_Submenu_Id.substring(0, 2);
        let params = {
            baseUrl: globalVariables.paramsReportBaseUrl,
            rwservlet: this.bankInfoList[0].REPORT_SERVER,
            desformat: this.bankInfoList[0].REPORT_FORMAT,
            destype: 'cache',
            report: `${globalVariables.reportPath}${subPart}/AC_4061`,
            X_Emp_Id: globalVariables.userInfo.emp_ID,
            X_Submenu_Id: 'AC_4061',
            X_company_no: globalVariables.userInfo.company_NO,
            X_currency_format: this.bankInfoList[0].SS_CURRENCY_FMT,
            X_date_format: this.bankInfoList[0].SS_DT_FMT,
            X_time_format: this.bankInfoList[0].SS_TIME_FMT,
            X_ROUND: 2,
            P_CHECKBOOKID: this.chequeBook.CHECKBOOK_ID,
            P_BANKDTLNO: this.bankName.BANKDTL_NO
        }

        this.utilityService.showReport(params);
    }


}
