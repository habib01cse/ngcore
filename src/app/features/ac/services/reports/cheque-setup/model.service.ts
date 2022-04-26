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

    public accountNoList = [];
    public chequeBookIdList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public reportInfoList = [];
    public roundlIist = [];
    public singleReportServerList= [];


    public selectedChequeBookId: boolean = true;

    constructor() { }

}
