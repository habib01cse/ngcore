import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from 'src/app/features/ac/ac.config';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Period } from '../../../models/period.model';
import { Voucher } from 'src/app/features/ac/models/voucher.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { VoucherDtl } from './../../../models/voucher-dtl.model';
const _url = acConfig.url.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public mstAdvanceAmt: 0;
    userPrivilege:UserPrivileges = new UserPrivileges();
    FORM_ID = 'AC_1286'   
    scheduleList: any = [];
    requisitionList: any = [];
    scheduleListBackup: any =[];

    updateScheList: any = [];
    statusList: any = [];
    

    constructor(private utilService:UtilityService) { }

}
