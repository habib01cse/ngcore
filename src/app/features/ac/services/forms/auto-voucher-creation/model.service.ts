/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DataService } from './data.service';
import { QJournalSetup } from '../../../models/q-journal.model';
import { Promise } from 'q';
import { QJournalDtls } from '../../../models/q-journam-dtl.model';
import { DateService } from 'src/app/shared';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ignoreElements } from 'rxjs/operators';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { FormParam } from '../../../models/form-param';
import { element } from 'protractor';



@Injectable({
    providedIn: 'root'
})
export class ModelService {

    qJournal: QJournalSetup;
    qJournalBackUp: QJournalSetup;
    qJournalDtls: QJournalDtls[] = new Array<QJournalDtls>();
    qJournalDtlsBackUp: QJournalDtls[] = new Array<QJournalDtls>();
    userPrivilege = new UserPrivileges();


    baseCR: number = 0;
    baseDR: number;
    selectedAccPath: string = '';

    baceCurrencyList: any = [];
    voucherTypeList: any = [];    
    quickJurnalList = [];
    currencyList = [];
    bankInfoList = [];
    voucherIdList = [];
    subMenuReportInfoList = [];
    public postDate: Date = null;

    public postDateFlag = false;
    public formParam: FormParam;


    constructor(private apiService: DataService,
        private alertService: AlertService,
        private commonService: CommonService,
        private utilityService: UtilityService
        , private dateUtil: DateService, ) {
        this.formParam = new FormParam();

    }

    init() {
        this.formParam.FORM_ID = 'AC_1051'
        this.qJournal = new QJournalSetup();        
        this.qJournalBackUp = new QJournalSetup();

        let promiseAll = [
            this.commonService.getBaseCurrency(),                        
            this.apiService.getCurrency(),
            this.commonService.getUserPrivileges(this.formParam.FORM_ID)
        ];
        forkJoin(promiseAll).subscribe(results => {
            this.baceCurrencyList = results[0].body;                   
            this.currencyList = results[1].body;
            this.userPrivilege = new UserPrivileges(results[2].body);
            this.calSum();

            //console.log("this.voucherTypeList", this.voucherTypeList);
        });
    }

    getQuickJurnalList(QJ_NO: any) {
        this.apiService.getJournal(QJ_NO).subscribe(result => {
            this.qJournal = new QJournalSetup(result[0].body);
            result[1].body.forEach(element => {
                this.qJournal.qJournalDtls.push(element)
            })
            this.calSum();
            // this.qJournalBackUp = new QJournalSetup(result.body);
        })

    }

    addNewQJurnal(): any {
        this.qJournal.qJournalDtls.push(new QJournalDtls());
    }

    saveQJ(): any {
        this.qJournalBackUp = Object.assign({}, this.qJournal);
        this.qJournalDtlsBackUp = JSON.parse(JSON.stringify(this.qJournal.qJournalDtls));
        this.apiService.saveQuickJournal(this.qJournal).subscribe(result => {
            this.alertService.success("Quick Journal saved successfully");
        },
            err => {
                this.displayError(err)
                this.alertService.warning("Failed to save Quick Journal!");
            },
            () => { })
    }

    createAutoVoucher() {
        this.apiService.createAutoVoucher(
            this.qJournal.QJ_NO,
            this.dateUtil.getYYYYMMDDDashFromDate(this.postDate),
            this.qJournal.VTYPE_NO,
            this.qJournal.DESCR
        ).subscribe(result => {
            this.alertService.success("New voucher created successfully");
        }, err => {
            this.alertService.warning("Failed to create New Voucher!");
        })
    }

    calSum() {
        this.baseCR = 0;
        this.baseDR = 0;
        this.qJournal.qJournalDtls.forEach(element => {
            if (this.userPrivilege.canShowData(element.SQL_STATE)) {
                this.baseDR += element.DR * element.EXCHANG_RATE;
                this.baseCR += element.CR * element.EXCHANG_RATE;
            }
        });
    }


    private displayError(ex): void {
        console.log(ex);
    }

    getDrCrList() {
        // return this.utilService.getEnumList(fixedValues.transactionType)
        return [{ TEXT: "DR", VALUE: "Dr" }, { TEXT: "CR", VALUE: "Cr" }]
    }

    reportPreview(MENU_ID): any {
        let promiseAll = [
            this.commonService.getReportInfoBySubMenuId('AC_1004'),
            this.commonService.getVouchersByViD(this.qJournal.V_ID),
            this.commonService.getReportInfo(MENU_ID)
        ]

        forkJoin(promiseAll).subscribe(results => {
            this.subMenuReportInfoList = results[0].body;
            this.voucherIdList = results[1].body;
            this.bankInfoList = results[2].body;
            this.makeReport();
        },
            err => {
                console.log('Err', err);
            })
    }

    makeReport() {
        let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
        let p_Submenu_Id;
        if (this.subMenuReportInfoList[0] == []) {
            p_Submenu_Id = 'AC_1004';
        } else {
            p_Submenu_Id = 'AC_3002';
        }
        let subPart = X_Submenu_Id.substring(0, 2);
        let params = {
            baseUrl: globalVariables.paramsReportBaseUrl,
            rwservlet: this.bankInfoList[0].REPORT_SERVER,
            desformat: this.bankInfoList[0].REPORT_FORMAT,
            destype: 'cache',
            report: `${globalVariables.reportPath}${subPart}/${p_Submenu_Id}`,
            X_Emp_Id: globalVariables.userInfo.emp_ID,
            X_Submenu_Id: p_Submenu_Id,
            X_company_no: globalVariables.userInfo.company_NO,
            X_currency_format: this.bankInfoList[0].SS_CURRENCY_FMT,
            X_date_format: this.bankInfoList[0].SS_DT_FMT,
            X_time_format: this.bankInfoList[0].SS_TIME_FMT,
            X_ROUND: 2,
            P_VNO: typeof this.voucherIdList != 'undefined' && typeof this.voucherIdList[0] != 'undefined' && typeof this.voucherIdList[0].V_NO != 'undefined' ? this.voucherIdList[0].V_NO : '',
            P_VTYPE: this.qJournal.VTYPE_NO,
            p_reppath: globalVariables.reportPath
        }

        this.utilityService.showReport(params);
    }

}
