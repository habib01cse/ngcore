/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CommonModel } from 'src/app/shared/models/common-model';
import { Ba } from '../../../models/ba.model';
import { AccountsBalanceDisplay } from '../../../models/account-balance-display';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public isHideGroupLedger: boolean = false;
    public isHideMonthlyStatement: boolean = false;

    public businessAreaList = [];
    public accountsList = [];
    public costCenterList = [];
    public refCenterList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public defaultReportList = [];
    public businessUnitAccountList = [];
    public multiCompanyCostList = [];
    public selectedBusinessAreaList = [];
    public changeBusinessAreaList = [];
    public reportInfoList = [];
    public defaultList = [];

    public postingStatusList = new Array<CommonModel>();
    public accountTypeList = new Array<CommonModel>();
    public balanceTypeList = new Array<CommonModel>();
    public roundlIist = [];
    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public selesctedRefCenterAll: boolean = false;
    public defaultServer;
    public reportTypeList = [];
    public changedBusinessUnit: boolean = false;
    public ledgerAccount:AccountsBalanceDisplay = new AccountsBalanceDisplay();


    constructor() { }

}


// /* angular stuff */
// import { Injectable } from '@angular/core';

// /* 3rd party libraries */
//

// /* our own stuff */
// import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
// import { CommonModel } from 'src/app/shared/models/common-model';
// import { Ba } from '../../../models/ba.model';
// import { Nature } from '../../../models/nature.model';
// import { Chart } from '../../../models/chart.model';
// @Injectable({
//     providedIn: 'root'
// })
// export class ModelService {

//     public businessAreaList = new List<any>();
//     public accountsList = new List<any>();
//     public costCenterList = new List<any>();
//     public refCenterList = new List<any>();
//     public reportServerList = new List<any>();
//     public outputFormatList = new List<any>();

//     public postingStatusList = new List<CommonModel>();
//     public accountTypeList = new List<CommonModel>();
//     public balanceTypeList = new List<CommonModel>();

//     // Done by Sabbir
//     public categoryList = new List<Nature>();
//     public parentList = new List<Chart>();
//     public defaultCurrencyList = new List<Currency>();




//     public baSubAll: boolean = false;
//     public costCenterSubAll: boolean = false;
//     public refCenterSubAll: boolean = false;
//     public landscpae: boolean = false;
//     public withDescription: boolean = false;
//     public showRunningBalance: boolean = false;
//     public groupledgerReport: boolean = false;
//     public monthlyLedgerReport: boolean = false;
//     public monthlyStatement: boolean = false;
//     public basecurrency: boolean = false;
//     public multiCurrency: boolean = false;
//     public showDetails: boolean = false;
//     public suppressZero: boolean = false;
//     public opening: boolean = false;


//     constructor() { }

// }
