import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from 'src/app/features/ac/ac.config';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Period } from '../../../models/period.model';
import { Voucher } from 'src/app/features/ac/models/voucher.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { VoucherDtl } from './../../../models/voucher-dtl.model';
import { MoneyRequisition } from '../../../models/money-requisition.model';
const _url = acConfig.url.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    userPrivilege:UserPrivileges = new UserPrivileges();
    public requisition: MoneyRequisition = new MoneyRequisition();
    public requisitionBackUp: MoneyRequisition = new MoneyRequisition();
    FORM_ID = 'AC_1130'   
    IS_CAN_SAVE:boolean;
    scheduleList: any = [];
    reqStatusList: any = [];
    paymentType: any = [];
    reqPriorityModel: any = [];
    particularList :any = [];
    public reportInfoList:any = [];
    public roundList: any = [];


    constructor(private utilService:UtilityService) { }

}
