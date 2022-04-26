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
    public accountsList = [];
    public costCenterList = [];
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
    public defaultServer ;


    constructor() { }

}
