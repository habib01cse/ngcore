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
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { element } from 'protractor';


@Injectable({
    providedIn: 'root'
})
export class ModelService {

    reportNameList: any[];
    repSetUp: ReportSetUp;
    
    repSetUpBackup: ReportSetUp;
    repSetUpDtl: ReportSetUpDetails[] = new Array<ReportSetUpDetails>();
    repSetUpDtlBackup: ReportSetUpDetails[] = new Array<ReportSetUpDetails>();
    reportList: any[];
    formParam: FormParam;
    public userPrivilege = new UserPrivileges();


    constructor(private apiService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService) {
        this.formParam = new FormParam();
    }

    init() {
        this.formParam.FORM_ID = 'AC_1009';
        this.repSetUp = new ReportSetUp();
        this.repSetUpBackup = new ReportSetUp();
        let promiseAll = [
            this.commonService.getReportNames('A'),
            // this.apiService.getRepositoryDetails(),
            // this.commonService.getChartOfAccounts(fixedValues.queryOptions.CoaForTC)
            this.commonService.getUserPrivileges(this.formParam.FORM_ID)


        ];
        forkJoin(promiseAll).subscribe(results => {

            this.reportNameList = results[0].body;
            // this.newList = results[1].body;
            // this.costCenterList = results[2].body;
            this.userPrivilege = new UserPrivileges(results[1].body)
        });
    }

    addNewReportDtl() {
        this.repSetUp.RepositoryDtlList.push(new ReportSetUpDetails());
    }
    // removeReportDtl(index, repDtl: ReportSetUpDetails) {
    //     if (repDtl.SQL_STATE == 1) {
    //         this.repSetUp.RepositoryDtlList.splice(index, 1);
    //     }
    //     else {
    //         repDtl.SQL_STATE = fixedValues.sqlState.sqlDelete;
    //     }
    // }

    getReportListByReportId(RP_NO: any) {
        this.apiService.getRepositoryDetails(RP_NO).subscribe(result => {
            this.repSetUp = new ReportSetUp(result[0].body);
            result[1].body.forEach(element => {
                this.repSetUp.RepositoryDtlList.push(element)
            })

            // this.repSetUpBackup = Object.assign({}, result.body);
            // this.repSetUpDtlBackup.length = 0;
            // this.repSetUpDtlBackup = JSON.parse(JSON.stringify(this.repSetUp.RepositoryDtlList));
        })
    }

    saveReport(): any {
        this.apiService.saveReport(this.repSetUp).subscribe(result => {
            this.repSetUpBackup = Object.assign({}, result.body);
            this.repSetUpDtlBackup.length = 0;
            this.repSetUpDtlBackup = JSON.parse(JSON.stringify(this.repSetUp.RepositoryDtlList));
            this.alertService.success("Saved Successfully");
        }, err => {
            this.alertService.warning("Failed to save data!");
        });
    }

}
