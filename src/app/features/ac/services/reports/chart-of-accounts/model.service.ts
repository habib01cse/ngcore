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

    public reportInfoList = [];
    public outputFormatList = [];
    public reportServerList = [];
    public roundlIist = [];
    public singleReportServerList = [];
    public reportOptiontypeList = [];


    constructor() { }

}
