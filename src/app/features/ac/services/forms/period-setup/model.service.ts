/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { OpenPeriod } from '../../../models/open-period.model';
import { Period } from '../../../models/period.model';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { DataService } from './data.service';
import { CommonService } from '../../common.service';
import { DateService } from 'src/app/shared';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    public fixedValues = fixedValues;
    public openingPeriodList = new Array<OpenPeriod>();
    public openingPeriodListBackup = new Array<OpenPeriod>();
    public period: Period;
    public periodList:Period[] = [];
    public selectedPeriodEdit: Period;
    public selectedPeriodEditBackup: Period;
    public selectedPeriodOpen: Period;
    public natureList = [];
    public selectedNature: any = null;
    public dateFormat = globalVariables.dateFormat.dateFormat;
    public userInfo = globalVariables.userInfo;
    public periodCloseModalShow: boolean = false;
    public periodOpenModalShow: boolean = false;
    public pStartDate: Date = new Date();
    public pEndDate: Date = new Date();
    public pStartDateDisable: boolean = false;
    public pEndDateDisable: boolean = false;
    public periodGroupList = [];
    public GROUPPERIOD_NO: any = null;
    public START_PERIOD_DATE: Date = new Date();
    public END_PERIOD_DATE: any = null;
    public userPrivilege = new UserPrivileges();
    public PERIOD_RANGE:string;

    MULTICOMPANY_CHART: Number;
    QUERYOPTIONS: Number;

    public selectedClosePeriod;

    public totalDebitAmount = 0;
    public totalCreditAmount = 0;
    public CURRENCY_NO = 0;
    public CURRENCY_NAME = '';

    //public _periodCloseModalShow:boolean = false;



    constructor(
        private dataSerice: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private dateUtil: DateService,
    ) { }

    public init() {
        this.resetSelectedPeriodEdit()
        this.commonService.getGroupPeriods().subscribe(result => {
            this.periodGroupList = result.body.map(period=> {
                return new Period(period);
            });
        });
        this.commonService.getNatures().subscribe(result => { this.natureList = result.body });
    }

    public resetSelectedPeriodEdit() {
        this.selectedPeriodEdit = new Period();
        this.selectedPeriodEdit.START_PERIOD_DATE = null;
        this.selectedPeriodEdit.END_PERIOD_DATE = null;

        this.selectedPeriodEditBackup = JSON.parse(JSON.stringify(this.selectedPeriodEdit));
    }

    public setSelectedPeriodEdit(_period: Period) {
        this.selectedPeriodEdit = new Period(_period);
    }

    public setSelectedPeriodOpen(_period: Period) {
        if(this.selectedPeriodOpen) {
            this.selectedPeriodOpen.SELECT_FLAG = false;
        }
        _period.SELECT_FLAG = true;
        this.selectedPeriodOpen = _period;
        this.getOpeningAccounts();
    }

    public getOpeningAccounts() {
        this.openingPeriodList.length = 0;
        if(this.selectedPeriodOpen) {
            this.dataSerice.getOpeningAccount(this.selectedNature, this.selectedPeriodOpen.PERIOD_NO, this.GROUPPERIOD_NO).subscribe(
                result => {
                    let results = result.body;
                    this.openingPeriodList = results.map(
                        x => {
                            return new OpenPeriod(x);
                        });

                    //calculate total amount
                    this.openPeriodSum();
                    this.openingPeriodListBackup = JSON.parse(JSON.stringify(this.openingPeriodList));
                }
            );
        }

    }

    onChangeGroupPeriod() {
       let obj;
        this.periodList.length = 0;
        this.selectedPeriodOpen = null;
        if(this.GROUPPERIOD_NO) {
            this.commonService.getPeriodsByGroupId(this.GROUPPERIOD_NO).subscribe(result => {
                this.periodList = result.body.map(period=> {
                    return new Period(period);
                });

                // if(this.periodList.length>0)
                // {
                //     obj=this.periodList[0];
                //     this.onClickPeriodSelect(obj)
                // }
                
             
            });
        }
    }

    addOpeningPeriod() {
        this.openingPeriodList.push(new OpenPeriod({ OPEN_DATE: this.selectedPeriodOpen.START_PERIOD_DATE, PERIOD_NO: this.selectedPeriodOpen.PERIOD_NO, GROUPPERIOD_NO:this.GROUPPERIOD_NO }));
    }

    /*saveOpeningPeriods() {
        let passingObj = {};
        passingObj['openPeriods'] = this.openingPeriodList.map(
            x => {
                x.OPEN_DATE = this.dateUtil.getYYYYMMDDDashFromDate(x.OPEN_DATE);
                return x;
            }
        );
        this.dataSerice.saveOpeningPeriods(passingObj).subscribe(result => {
            this.openingPeriodList = [];
            result.body['openPeriods'].forEach(element => {
                element.OPEN_DATE = new Date(element.OPEN_DATE);
                this.openingPeriodList.push(new OpenPeriod(element));
            });
            this.openingPeriodListBackup = JSON.parse(JSON.stringify(this.openingPeriodList));
            this.alertService.success("Saved Successfully");
        }, err => {
            this.alertService.warning("Failed to save Openinng Period!");
        });
    }
    */

    addNewPeriod() {
        this.selectedPeriodEdit = new Period();
    }

    savePeriod() {
        
    }

    //Open Period
    openPeriod(_period: Period) {
        let passingObj = Object.assign({}, _period);
        passingObj.START_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.START_PERIOD_DATE);
        passingObj.END_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.END_PERIOD_DATE);

        this.dataSerice.getPeriodClose(_period.PERIOD_NO).subscribe(result => {
            _period['P_PERIOD_CHK'] = result.body;
            if (!_period.hasOwnProperty('P_OPN_PERIOD')) {
                _period['P_OPN_PERIOD'] = null;
            }
            this.openPeriodBus(_period);
        })
    }
    // Open Period Bus
    openPeriodBus(_period) {
        this.selectedClosePeriod = _period;
        if ((_period.P_PERIOD_CHK.P_MAX_PRO - 1 == _period.PERIOD_NO) && (_period.P_PERIOD_CHK.P_CLOSE_FLAG == 1)) {
            this.dataSerice.periodClose(_period.PERIOD_NO, _period.P_PERIOD_CHK.P_MAX_PRO).subscribe(result => {
                this.alertService.success("Period open successfully");
                _period.CLOSE_FLAG = 0;
            }, err => {
                this.alertService.warning("Failed to open Period!");
            });
        }
        else {
            this.alertService.warning("DO NOT OPEN THIS PERIOD.");
        }
    }

    //Close Period
    closePeriod(_period: Period) {

        let passingObj = Object.assign({}, _period);
        passingObj.START_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.START_PERIOD_DATE);
        passingObj.END_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.END_PERIOD_DATE);
        this.dataSerice.getPeriodClose(_period.PERIOD_NO).subscribe(result => {
            _period['P_PERIOD_CHK'] = result.body;
            if (!_period.hasOwnProperty('P_OPN_PERIOD')) {
                _period['P_OPN_PERIOD'] = null;
            }
            this.closePeriodBus(_period);
        })
    }

    //Period close bus
    closePeriodBus(_period) {
        this.selectedClosePeriod = _period;
        if (_period.P_PERIOD_CHK.P_MAX_CLOSE_FLAG != null && _period.P_PERIOD_CHK.P_MAX_CLOSE_FLAG == 0) {
            this.alertService.warning("IMMEDIATE PERIOD NOT CLOSED!");
        }
        else {
            if (_period.P_PERIOD_CHK.P_MIN_PERIOD_NO != null) {
                this.periodCloseModalShow = true;

                this.pStartDate = new Date(this.selectedClosePeriod.P_PERIOD_CHK.P_MIN_START_PERIOD_DATE);
                this.pEndDate = new Date(this.selectedClosePeriod.P_PERIOD_CHK.P_MIN_END_PERIOD_DATE);
                this.pStartDateDisable = true;
                this.pEndDateDisable = true;
            }
            else {
                this.periodCloseModalShow = true;
                this.pStartDate = null;
                this.pEndDate = null;
                this.pStartDateDisable = false;
                this.pEndDateDisable = false;
            }
        }
    }

    //Period close confirmation
    periodCloseConfirm(currentPeriod) {
        let passingObj = Object.assign({}, this.selectedClosePeriod);
        passingObj.START_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(this.pStartDate);
        passingObj.END_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(this.pEndDate);

        this.periodCloseModalShow = false;
        if ((this.selectedClosePeriod.START_PERIOD_DATE == null) || (this.selectedClosePeriod.END_PERIOD_DATE == null)) {
            this.alertService.warning("Please Enter Date Range!");
        }
        else {
            this.dataSerice.processPeriod(
                this.selectedClosePeriod.PERIOD_NO,
                passingObj.START_PERIOD_DATE,
                passingObj.END_PERIOD_DATE,
                this.selectedClosePeriod.P_OPN_PERIOD,
                this.selectedClosePeriod.P_PERIOD_CHK.P_MAX_PRO,
            ).subscribe(result => {
                this.alertService.success("Period closed successfully!");
                currentPeriod.CLOSE_FLAG = 1;
            }, err => {
                this.alertService.warning("Failed to close Period!");
            });
        }
    }


    // removePeriod(_period: Period) {
    //     let passingObj = Object.assign({}, _period);
    //     passingObj.START_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.START_PERIOD_DATE);
    //     passingObj.END_PERIOD_DATE = this.dateUtil.getYYYYMMDDDashFromDate(passingObj.END_PERIOD_DATE);
    //     this.dataSerice.removePeriod(passingObj).subscribe(result => {
    //         this.alertService.success("Deleted Successfully");
    //     }, err => {
    //         this.alertService.warning("Failed to delete Period");
    //     });
    // }

    removePeriodDtl(index, _openPeriod: OpenPeriod) {
        if (_openPeriod.SQL_STATE == 1) {
            this.openingPeriodList.splice(index, 1);
        }
        else {
            _openPeriod.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    openPeriodSum() {
        this.totalDebitAmount = 0;
        this.totalCreditAmount = 0;
        for (const iterator of this.openingPeriodList) {
            if ((typeof iterator.DR !== 'undefined') && (iterator.SQL_STATE !== 3 )) {
                this.totalDebitAmount += isNaN(Number(iterator.DR)) ? 0 : Number(iterator.DR);
            }
            if ((typeof iterator.CR !== 'undefined') && (iterator.SQL_STATE !== 3 )) {
                this.totalCreditAmount += isNaN(Number(iterator.CR)) ? 0 : Number(iterator.CR);
            }
        }
    }
    openPeriodDRSum(list) {
        let amount = 0;
        this.totalCreditAmount = 0;
        for (const iterator of list) {
            if ((typeof iterator.DR !== 'undefined') && (iterator.SQL_STATE !== 3 )) {
                amount += isNaN(Number(iterator.DR)) ? 0 : Number(iterator.DR);
            }
        }
        return amount;
    }
    openPeriodCRSum(list) {
        let amount = 0;
        this.totalCreditAmount = 0;
        for (const iterator of list) {
            if ((typeof iterator.CR !== 'undefined') && (iterator.SQL_STATE !== 3 )) {
                amount += isNaN(Number(iterator.CR)) ? 0 : Number(iterator.CR);
            }
        }
        return amount;
    }



}
