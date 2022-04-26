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


    public costCenterList = [];
    public businessAreaList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public companyList = [];
    public selectedCompanyAll: boolean = false;
    public selectedCompanyCount = 0;
    public businessUnitAccountList = [];
    public changeBusinessAreaList = [];
    public selectedBusinessAreaList = [];

    public selectedReportType: boolean = false;
    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public changedBusinessUnit: boolean = false;
    public reportServerSingleList = [];
    public singleReportServerList = [];


    constructor() { }

}
