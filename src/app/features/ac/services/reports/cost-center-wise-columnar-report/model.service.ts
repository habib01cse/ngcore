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

    public reportNameList = [];
    public costCenterList = [];
    public accountList = [];
    public businessAreaList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public defaultReportList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public defaultBusinesAreaList = [];
    public selesctedBusinessAreaAll: boolean = false;
    public selesctedCostCenterAll: boolean = false;
    public singleReportServerList = [];


    constructor() { }

}

