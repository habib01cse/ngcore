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

    public businessAreaList = [];
    public costCenterList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public selectedBusinessAreaList = [];
    public businessUnitAccountList = [];
    public changeBusinessAreaList = [];
    public reportInfoList = [];
    public accountList = [];
    public roundList = [];
    public singleReportServerList = [];


    selectedReportType: boolean = false;
    selesctedBusinessAreaAll: boolean = false;
    selesctedCostCenterAll: boolean = false;

    constructor() { }

}
