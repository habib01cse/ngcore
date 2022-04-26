/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public bankList = [];
    public voucherList = [];
    public reportServerList = [];
    public outputFormatList = [];
    public printTypeList = [];
    public vaucherDateList = [];
    public reportInfoList = [];
    public roundlIist = [];

    public defaultPrintType;
    public defaultServer;



    constructor() { }

}
