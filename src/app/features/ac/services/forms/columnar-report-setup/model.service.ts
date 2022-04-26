/* angular stuff */
import { Injectable } from '@angular/core';
import { DataService } from './data.service';


/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { ReportSetUp } from '../../../models/repsetup.model';
import { ReportSetUpDetails } from '../../../models/report-set-up-details.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { FormParam } from '../../../models/form-param';
import { element } from 'protractor';


@Injectable({
    providedIn: 'root'
})
export class ModelService {

    reportNameList: any[];
    repSetUp: ReportSetUp;
    repSetUpBackUp: ReportSetUp;
    repSetUpDtl: ReportSetUpDetails[] = new Array<ReportSetUpDetails>();
    repSetUpDtlBackup: ReportSetUpDetails[] = new Array<ReportSetUpDetails>();
    reportList: any[];
    public userPrivilege = new UserPrivileges();
    formParam;



    constructor(private apiService: DataService,
        private alertService: AlertService,
        private commonService: CommonService) {
        this.formParam = new FormParam();
    }

    init() {
        this.formParam.FORM_ID = 'AC_1028';
        this.repSetUp = new ReportSetUp();
        this.repSetUpBackUp = new ReportSetUp();
        let promiseAll = [
            this.commonService.getReportNames('B'),
            this.commonService.getUserPrivileges(this.formParam.FORM_ID)
        ];
        forkJoin(promiseAll).subscribe(results => {

            this.reportNameList = results[0].body;
            this.userPrivilege = new UserPrivileges(results[1].body)
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

    getReportListByReportId(RP_NO: any) {
        this.apiService.getRepositoryDetails(RP_NO).subscribe(result => {
            this.repSetUp = new ReportSetUp(result[0].body[0]);
            result[1].body.forEach(element => {
                this.repSetUp.RepositoryDtlList.push(element)
            })
            this.repSetUpBackUp = Object.assign({}, this.repSetUp);
            this.repSetUpDtlBackup.length = 0;
            this.repSetUpDtlBackup = JSON.parse(JSON.stringify(this.repSetUp.RepositoryDtlList));
        })
    }

    saveReport(): any {
        this.repSetUp.REP_TYPE = 'B';
        this.apiService.saveReport(this.repSetUp).subscribe(result => {
            this.alertService.success("Setup saved successfully");
            this.repSetUp = new ReportSetUp(result.body);
        }, error => {
            this.alertService.warning("Failed to save Report Setup!");
        });
    }

}
