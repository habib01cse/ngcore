/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public perparedByList = [];
    public costCenterList = [];
    public businessAreaList = [];
    public accountsList = [];
    public accountsList2 = [];
    public voucherTypeList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public selectedBusinessAreaList = [];
    public selectedAccountList = [];
    public selectedPreparedByList = [];
    public singleReportServerList = [];
    public roundlIist = [];
    public reportInfoList = [];
    public defaultServerList = [];
    public yearList = [];
    public deptList = [];

    public selectedReport: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public selesctedBusinessAreaAll: boolean = false;


   // public voucherTypeList = new Array<CommonModel>();
    public accountTypeList = new Array<CommonModel>();
    public postStatusTypeList = new Array<CommonModel>();
    public budgetTypeTypeList = new Array<CommonModel>();
    public dayBookreportTypeList = new Array<CommonModel>();


    constructor() { }

}
