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
import { DeleveryReg } from '../../../models/delevery-regestration';
import { UserPrivileges } from 'src/app/core/models/user-privileges';



@Injectable({
    providedIn: 'root'
})
export class ModelService {


    public selectedStatus;
    public exportStatus;
    salesInvoiceList = [];
    detailNameList = [];
    trnNameList = [];
    dcdoDateList = [];
    saleReturnTypeList = [];
    postTypeList: any = [];
    exportStatusList: any = [];
    DC_RETURN_DATE: string;
    TRN_NAME: string;
    DETAILS_NAME: string;
    public totalReqQty: number;
    public totalGrandAmount: number;
    public selectdInvoiceStatus: DeleveryReg = new DeleveryReg();
    public gLpostModalStatus: boolean = false;
    invoiceStatusDetailsList = [];
    reportInfoList = [];
    roundlIist = [];
    totalSalesTotal: number = 0;
    dateTypeList = [];
    userPrivilege = new UserPrivileges()

    public invoiceStatusList: DeleveryReg[];

    constructor(private dataService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private dateService: DateService) {
        this.invoiceStatusList = new Array<DeleveryReg>();
        this.postTypeList = fixedValues.postStatus;
        this.exportStatusList = fixedValues.invoiceType1;
    }

    init() {
        let promiseAll = [
            this.commonService.getSaleInvoice(),
            this.commonService.getDtlNames(),
            this.commonService.getTrnNames(),
        ];
        forkJoin(promiseAll).subscribe(results => {
            this.salesInvoiceList = results[0].body;
            this.detailNameList = results[1].body;
            this.trnNameList = results[2].body;

            if (typeof this.trnNameList != 'undefined' && typeof this.trnNameList[0] != undefined && typeof this.trnNameList[0].TRNTYPE_NO) {
                this.TRN_NAME = this.trnNameList[0].TRNTYPE_NO;
            }

            if (typeof this.detailNameList != 'undefined' && typeof this.detailNameList[0] != undefined && typeof this.detailNameList[0].LOOKUPDTL_NO) {
                this.DETAILS_NAME = this.detailNameList[0].LOOKUPDTL_NO;
            }
        });
    }

    onSearchGetData(STATUS, LEVEL, ORDER, START_DATE, END_DATE, ACCOUNT_MAP): any {
        this.dataService.getDataByPostStatus(STATUS, LEVEL, ORDER, START_DATE, END_DATE, ACCOUNT_MAP).subscribe(result => {
            this.invoiceStatusList = [];
            result.body.forEach(element => {
                element.GL_POST_FLAG = element.GL_POSTDATE ? 1 : 0;
                this.invoiceStatusList.push(new DeleveryReg(element))
            });
            // this.invoiceStatusList = result.body;
            this.totalAmountSum();
            if (typeof this.invoiceStatusList != 'undefined' && typeof this.invoiceStatusList[0] != 'undefined' && typeof this.invoiceStatusList[0].TRN_NO != 'undefined') {
                this.dataService.getData(this.invoiceStatusList[0].TRN_NO).subscribe(result => {
                    this.invoiceStatusDetailsList = result.body;
                    this.totalAmountDetailsSum();
                })
            }
        }, err => {
            console.log('Error in AC_1122 Component model', err);
        }, () => {
            console.log('Error in AC_1122 Component model');
        })
    }

    public totalAmountSum() {
        this.totalGrandAmount = 0;
        this.totalReqQty = 0;
        for (const iterator of this.invoiceStatusList) {
            if ((typeof iterator.GRAND_TOTAL !== 'undefined')) {
                this.totalGrandAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
            }
            if ((typeof iterator.RCV_QTY !== 'undefined')) {
                this.totalReqQty += isNaN(Number(iterator.RCV_QTY)) ? 0 : Number(iterator.RCV_QTY);
            }
        }
    }


    public CreatePostVoucher() {
        // this.selectdInvoiceStatus["TRN_DATE1"] = this.dateService.getYYYYMMDDDashFromDate(new Date(this.selectdInvoiceStatus.TRN_DATE));
        // this.dataService.createVoucher(this.selectdInvoiceStatus).subscribe(result => {
        //     this.selectdInvoiceStatus.V_NO = result.body.P_V_NO;
        //     this.selectdInvoiceStatus.GL_POSTDATE = result.body.P_GL_POSTDATE;
        //     this.selectdInvoiceStatus.V_ID = result.body.P_V_ID;
        // });
    }


    getDetailsData(invoiceStatus): any {
        this.dataService.getData(invoiceStatus.TRN_NO).subscribe(result => {
            this.invoiceStatusDetailsList = result.body;
            this.totalAmountDetailsSum();
        })
    }

    public totalAmountDetailsSum() {
        this.totalSalesTotal = 0;
        for (const iterator of this.invoiceStatusDetailsList) {
            if ((typeof iterator.SALE_TOTAL !== 'undefined')) {
                this.totalSalesTotal += isNaN(Number(iterator.SALE_TOTAL)) ? 0 : Number(iterator.SALE_TOTAL);
            }
        }
    }


    private displayError(ex): void {
        console.log(ex);
    }




}
