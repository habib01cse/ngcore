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


    public activeList = [];
    public natureNameList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public reportInfoList = [];
    public roundlIist = [];

    public selectedDate = false;
    public defaultReportServerList = [];
    public singleReportServerList = [];


    constructor() { }

}
