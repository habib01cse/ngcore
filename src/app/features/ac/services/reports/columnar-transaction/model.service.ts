/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CommonModel } from 'src/app/shared/models/common-model';
import { Ba } from '../../../models/ba.model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public isHideGroupLedger: boolean = false;
    public isHideMonthlyStatement: boolean = false;

    public reportList = [];
    public costCenterList = [];
    public businessAreaList = [];
    public chequeBookIdList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public businessUnitAccountList = [];
    public selectedBusinessAreaList = [];
    public changeBusinessAreaList = [];
    public reportInfoList = [];
    public defaultList = [];
    public roundlIist = [];
    public singleReportServerList = [];


    public postingStatusList = new Array<CommonModel>();
    public accountTypeList = new Array<CommonModel>();
    public balanceTypeList = new Array<CommonModel>();
    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public selesctedRefCenterAll: boolean = false;
    public changedBusinessUnit: boolean = false;
    public selectedDate: boolean =  false;
    public selectedMonth: boolean = true;

    constructor() { }

}

