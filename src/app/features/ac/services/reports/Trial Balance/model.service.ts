/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public costCenterList = [];
    public businessAreaList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public selectedBusinessAreaList = [];
    public businessUnitAccountList = [];
    public multiCompanyCostList = [];
    public changeBusinessAreaList = [];
    public reportInfoList = [];
    public roundlIist = [];

    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public changedBusinessUnit: boolean = false;


    public postingStatusTypeList = new Array<CommonModel>();
    public defaultServer;
    public reportCategoryTypeList = [];


    constructor() { }

}
