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

    public companyList = [];
    public bankNameList = [];
    public branchNameList = [];
    public accountList = [];
    public costCenterList = [];
    public beneficiaryList = [];
    public chequeBookNoList = [];
    public chequeNoList = [];
    public filterOptionList = [];
    public settlementTypeList = [];
    public ledgerHeadList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public selectedBusinessAreaList = [];
    public singleReportServerList = [];

    constructor() { }

}
