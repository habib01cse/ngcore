/* angular stuff */
import { Injectable } from '@angular/core';
import { DataService } from './data.service';


/* 3rd party libraries */
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { ReportSetUp } from '../../../models/repsetup.model';
import { ReportSetUpDetails } from '../../../models/report-set-up-details.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';


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
    formParam: FormParam;
    public userPrivilege = new UserPrivileges();


    constructor(private apiService: DataService,
        private alertService: AlertService,
        private commonService: CommonService,
        private utilityService: UtilityService) {
        this.formParam = new FormParam();
    }

    init() {
        this.formParam.FORM_ID = 'AC_1029';
        this.repSetUp = new ReportSetUp();
        this.repSetUpBackUp = new ReportSetUp();
        let promiseAll = [
            this.commonService.getReportNames('C'),
            this.commonService.getUserPrivileges(this.formParam.FORM_ID)
        ];
        forkJoin(promiseAll).subscribe(results => {

            this.reportNameList = results[0].body;
            this.userPrivilege = new UserPrivileges(results[1].body);
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
            this.repSetUp = new ReportSetUp(result[0].body);
            result[1].body.forEach(element => {
                this.repSetUp.RepositoryDtlList.push(element)
            })
        })
    }

    saveReport(): any {
        this.repSetUp.REP_TYPE = "C";
        this.apiService.saveReport(this.repSetUp).subscribe(result => {
            this.alertService.success("Setup saved successfully");
            this.repSetUp = new ReportSetUp(result.body);
            this.repSetUpBackUp = Object.assign({}, this.repSetUp);
            this.repSetUpDtlBackup.length = 0;
            this.repSetUpDtlBackup = JSON.parse(JSON.stringify(this.repSetUp.RepositoryDtlList));

        }, error => {
            this.alertService.warning("Failed to save Report Setup!");
        });
    }

}
