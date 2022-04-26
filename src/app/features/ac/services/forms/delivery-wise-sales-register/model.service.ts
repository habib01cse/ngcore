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
    postTypeList: any = [];
    exportStatusList: any = [];
    DC_OC_DATE: string;
    public selectType = "";
    public orderTypeList: any = [];
    TRN_NAME: any = null;
    DETAILS_NAME: string;
    public totalReqQty: number;
    public totalGrandAmount: number;
    public selectdInvoiceStatus: DeleveryReg = new DeleveryReg();
    public postModalStatus: boolean = false;
    invoiceStatusDetailsList = [];
    reportInfoList = [];
    roundlIist = [];
    userPrivilege = new UserPrivileges()

    public invoiceStatusList: DeleveryReg[];
    totalSalesTotal: number;

    constructor(private dataService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private dateService: DateService) {
        this.invoiceStatusList = new Array<DeleveryReg>();
        this.postTypeList = fixedValues.postStatus;
        this.exportStatusList = fixedValues.invoiceType;
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
            this.TRN_NAME =  results[2].body[0].TRNTYPE_NO;
            if (typeof this.trnNameList != 'undefined' && typeof this.trnNameList[0] != 'undefined' && typeof this.trnNameList[0].TRNTYPE_NO != 'undefined') {
                this.TRN_NAME = this.trnNameList[0].TRNTYPE_NO;
            }

            if (typeof this.detailNameList != 'undefined' && typeof this.detailNameList[0] != 'undefined' && typeof this.detailNameList[0].LOOKUPDTL_NO != 'undefined') {
                this.DETAILS_NAME = this.detailNameList[0].LOOKUPDTL_NO;
            }
           // this.TRN_NAME = null;

           console.log("this.TRN_NAME", this.TRN_NAME);
        });
    }

    onSearchGetData(STATUS, LEVEL, ORDER, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE): any {
        // this.dataService.getDataByPostStatus(STATUS, LEVEL, ORDER, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE).subscribe(result => {
        //     this.invoiceStatusList = [];
        //     result.body.forEach(element => {
        //         element.GL_POST_FLAG = element.GL_POSTDATE ? 1 : 0;
        //         this.invoiceStatusList.push(new DeleveryReg(element))
        //     });
        //     // this.invoiceStatusList = result.body;
        //     this.totalAmountSum();
        //     if (typeof this.invoiceStatusList != 'undefined' && typeof this.invoiceStatusList[0] != 'undefined' && typeof this.invoiceStatusList[0].TRN_NO != 'undefined') {
        //         this.dataService.getData(this.invoiceStatusList[0].TRN_NO).subscribe(result => {
        //             this.invoiceStatusDetailsList = result.body;
        //             this.totalAmountDetailsSum();
        //         })
        //     }

        // }, err => {
        //     console.log('Error in AC_1115 Component model', err);
        // }, () => {
        //     console.log('Error in AC_1115 Component model');
        // })
    }

    public totalAmountSum() {
        this.totalGrandAmount = 0;
        this.totalReqQty = 0;
        for (const iterator of this.invoiceStatusList) {
            if ((typeof iterator.GRAND_TOTAL !== 'undefined')) {
                this.totalGrandAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
            }
            if ((typeof iterator.ISU_QTY !== 'undefined')) {
                this.totalReqQty += isNaN(Number(iterator.ISU_QTY)) ? 0 : Number(iterator.ISU_QTY);
            }
        }
    }


    public CreatePostVoucher() {
        this.selectdInvoiceStatus["TRN_DATE1"] = this.dateService.getYYYYMMDDDashFromDate(new Date(this.selectdInvoiceStatus.TRN_DATE));
        this.dataService.createVoucher(this.selectdInvoiceStatus).subscribe(result => {
            // console.log(result.body)
            this.selectdInvoiceStatus.V_NO = result.body.P_V_NO;
            this.selectdInvoiceStatus.GL_POSTDATE = result.body.P_GL_POSTDATE;
            this.selectdInvoiceStatus.V_ID = result.body.P_V_ID;
        });
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
