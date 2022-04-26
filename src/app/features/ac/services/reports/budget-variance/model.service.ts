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

    public financialYearsList = [];
    public accountList = [];
    public budgetPeriodList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public defaultReportList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public singleReportServerList = [];
    public fundList = [];
    public defaultServer;

    public selectedDate: boolean =  false;


    constructor() { }

}

