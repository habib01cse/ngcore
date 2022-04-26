/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DataService } from './data.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { DateService } from 'src/app/shared';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { FormParam } from '../../../models/form-param';
import { BankLone } from '../../../models/bank-loan.model';
import { BankLoneDtl } from '../../../models/bank-loan-details.model';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { element } from 'protractor';
import { DataLoadService } from 'src/app/shared/services/data-load.service';




@Injectable({
    providedIn: 'root'
})
export class ModelService {



    public bankNameList = [];
    public natureNameList = [];
    public loanCategoryList = [];
    public loanTypeList = [];
    public importLcNoList = [];
    public exportLcNoList = [];
    public ledgerList = [];
    public costCenterList = [];
    public interestTypeList = [];
    public paymentPolicyList = [];
    public bankLoneList = [];
    public lodeIdList = [];


    public selectedBankNo: number = null;
    public selectedLoneNo: number = null;
    public selectedLoneId: number = null;
    public selectedBankLoneNo: number = null;
    public bankLone: BankLone;
    public bankLoneBackUp: BankLone;
    public bankLoanDtlBackUp: BankLoneDtl[] = new Array<BankLoneDtl>();
    public totalShedulePayment: number = 0;
    public PAYMENT_POLICY_NO: number;

    public formParam: FormParam;
    public totalPrinciple: number = 0;
    public totalInterest: number = 0;
    public totalExtraPayment: number = 0;
    public totalPayment: number = 0;
    public schedulePayment: number = 0;
    public isBankCalculation: boolean = true;
    public reportInfoList = [];
    public roundlIist = [];
    userPrivilege = new UserPrivileges();
    public  paymentNO:number=0;
    public actualPaymentNO:number=0;


    constructor(private dataService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private dateService: DateService,
        private dataLoadService:DataLoadService) {
            this.bankLone = new BankLone();
            this.bankLoneBackUp = new BankLone();
    }

    init() {
        this.formParam = new FormParam();
        this.formParam.FORM_ID = 'AC_1060'
        this.bankLone = new BankLone();
        let promiseAll = [
            this.commonService.getAllBanksName(),
            this.commonService.getLoanNature(),
            this.commonService.getLoanCategy(),
            this.commonService.getLoanType(),
            this.commonService.getImportLcNo(),
            this.commonService.getExportLcNo(),
            // this.commonService.getLedger(),
            // this.commonService.getCostCenter(),
            this.commonService.getInterestType(),
            this.commonService.getPaymentPolicy(),
            // this.commonService.getBankLoans(),
            this.commonService.getBankLoan(
                this.dateService.getYYYYMMDDDashFromDate(this.formParam.START_DATE),
                this.dateService.getYYYYMMDDDashFromDate(this.formParam.END_DATE),
                this.selectedBankNo,
                this.selectedLoneNo,
                this.selectedLoneId),
            this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP',{
                P_CURRFORM: this.formParam.FORM_ID
            })
        ];
        forkJoin(promiseAll).subscribe(results => {
            this.bankNameList = results[0].body;
            this.natureNameList = results[1].body;
            this.loanCategoryList = results[2].body;
            this.loanTypeList = results[3].body;
            this.importLcNoList = results[4].body;
            this.exportLcNoList = results[5].body;
            // this.ledgerList = results[6].body;
            // this.costCenterList = results[7].body;
            this.interestTypeList = results[6].body;
            this.paymentPolicyList = results[7].body;
            // this.bankLoneList = results[10].body;
            this.lodeIdList = results[8].body;
            this.userPrivilege = new UserPrivileges(results[9].body)
        });
    }

    getBankLone(): any {
        this.dataService.getBankLoans(this.selectedBankLoneNo).subscribe(result => {
            this.bankLone = new BankLone(result[0].body);
            result[1].body.forEach(element => {
                this.bankLone.bankLoanDtl.push(element)
            })
            this.totalAmountSum();
            this.isBankCalculation = false;
        })
    }

    public totalAmountSum() {
        this.totalShedulePayment = 0;
        this.totalPrinciple = 0;
        this.totalInterest = 0;
        this.totalExtraPayment = 0;
        this.totalPayment = 0;
        for (const iterator of this.bankLone.bankLoanDtl) {
            if ((typeof iterator.SCHEDULE_PAYMENT !== 'undefined')) {
                this.schedulePayment = 0;
                this.schedulePayment = iterator.SCHEDULE_PAYMENT;
                this.totalShedulePayment += isNaN(Number(iterator.SCHEDULE_PAYMENT)) ? 0 : Number(iterator.SCHEDULE_PAYMENT);
            }
            if ((typeof iterator.AMOUNT !== 'undefined')) {
                this.totalPrinciple += isNaN(Number(iterator.AMOUNT)) ? 0 : Number(iterator.AMOUNT);
            }
            if ((typeof iterator.INTEREST !== 'undefined')) {
                this.totalInterest += isNaN(Number(iterator.INTEREST)) ? 0 : Number(iterator.INTEREST);
            }
            if ((typeof iterator.EXTRA_PAYMENT !== 'undefined')) {
                this.totalExtraPayment += isNaN(Number(iterator.EXTRA_PAYMENT)) ? 0 : Number(iterator.EXTRA_PAYMENT);
            }
            if ((typeof iterator.TOTAL_PAYMENT !== 'undefined')) {
                this.totalPayment += isNaN(Number(iterator.TOTAL_PAYMENT)) ? 0 : Number(iterator.TOTAL_PAYMENT);
            }
        }
    }

    calculateLone(): any {
        this.dataService.getLoanCalculation(this.dateService.getYYYYMMDDDashFromDate(this.bankLone.LOAN_START_DATE)
            , this.bankLone.PRINCIPAL_AMOUTN
            , this.bankLone.ANNUAL_INTAREST_RATE
            , this.bankLone.LOAN_PERIOD
            , this.bankLone.INTEREST_TYPE
            , this.PAYMENT_POLICY_NO).subscribe(result => {
                this.bankLone.bankLoanDtl.length = 0;
                result.body.forEach(element => {
                    this.bankLone.bankLoanDtl.push(new BankLoneDtl(element));
                });
                // this.bankLone.bankLoanDtl = result.body;
                this.totalAmountSum();
            })
    }

    saveBankLone(): any {
        this.dataService.saveBankLoans(this.bankLone).subscribe(result => {
            this.bankLone = new BankLone(result.body);
            this.bankLoneBackUp = Object.assign({}, this.bankLone);
            this.bankLoanDtlBackUp = JSON.parse(JSON.stringify(this.bankLone.bankLoanDtl));
        })
    }




    onPreviewReport(): any {
        let p_Submenu_Id = 'AC_4223';
        let subPart = p_Submenu_Id.substring(0, 2);
        let promiseAll = [
            this.commonService.getReportInfo('AC_4223'),
            this.commonService.getRound(),
        ]
        forkJoin(promiseAll).subscribe(results => {
            this.reportInfoList = results[0].body;
            this.roundlIist = results[1].body;

            let params = {
                baseUrl: globalVariables.paramsReportBaseUrl,
                rwservlet: this.reportInfoList[0].REPORT_SERVER,
                desformat: this.reportInfoList[0].REPORT_FORMAT,
                destype: 'cache',
                report: `${globalVariables.reportPath}${subPart}/${p_Submenu_Id}`,
                X_Emp_Id: globalVariables.userInfo.emp_ID,
                X_Submenu_Id: p_Submenu_Id,
                X_company_no: globalVariables.userInfo.company_NO,
                X_currency_format: this.reportInfoList[0].SS_CURRENCY_FMT,
                X_date_format: this.reportInfoList[0].SS_DT_FMT,
                X_time_format: this.reportInfoList[0].SS_TIME_FMT,
                X_ROUND: this.roundlIist[0].F_ROUND,
                P_LOAN_NO: this.bankLone.BANKLOAN_NO == null ? '' : this.bankLone.BANKLOAN_NO,
                p_reppath: globalVariables.reportPath,
            }

            this.utilityService.showReport(params);
        })
    }

    private displayError(ex): void {
        console.log(ex);
    }
    public total(data,prop){
        let t=0;
        for(let iterator of data){
          if(iterator[prop]!=='undefined'){
           t += isNaN(Number(iterator[prop])) ? 0 : Number(iterator[prop]);
          }
        }
        return t;
      }
    }

