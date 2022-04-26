/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CommonModel } from 'src/app/shared/models/common-model';
import { Ba } from '../../../models/ba.model';
import { Company } from '../../../models/company.model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public businessAreaList = [];
    public costCenterList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public selectedBusinessAreaList = [];
    public businessUnitAccountList = [];
    public changeBusinessAreaList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public reportServerSingleList = [];
    public companyList = Array<Company>();
    public selectedCompanyCount = 0;
    public selectedCompanyAll: boolean =  false;
    public accountsList = [];
    public multiCompanyCostList = [];
    public refCenterList = [];
    public postingStatusList = [];
    public balanceTypeList = [];
    public selectedStartDate: boolean = false;
    public minPeriodList = [];
    public upgradeDetailsList = [];
    public ledgerDetailsList = [];
    public selesctedRefCenterAll: boolean = false;
    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public changedBusinessUnit: boolean = false;
    public selectedReportType: boolean = false;
    public singleReportServerList = [];




    constructor() { }

}
