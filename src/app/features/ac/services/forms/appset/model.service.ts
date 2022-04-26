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
import { Appset } from '../../../models/appset.model';
import { AppsetDtl } from '../../../models/appset-dtl.model';
import { AppUser } from '../../../models/app-user.model';
import { Appprivilege } from '../../../models/app-privilege.model';
const _url = acConfig.url.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    userPrivilege:UserPrivileges = new UserPrivileges();

    public appset: Appset = new Appset();
    public appsetBackUp: Appset = new Appset();
    public appsetResetBackup = Array<Appset>();    
   
    public appsetDtl: AppsetDtl = new AppsetDtl();
    public appsetDtlBackUp: AppsetDtl = new AppsetDtl();
    public appsetDtlResetBackUp = Array<AppsetDtl>();    

    public appUser: AppUser = new AppUser();
    public appUserBackUp: AppUser = new AppUser();
    public appUserBackUpReset = Array<AppUser>();   

    public appPrvlg: Appprivilege = new Appprivilege();
    public appPrvlgBackUp: Appprivilege = new Appprivilege();
    public appPrvgBackUpReset = Array<Appprivilege>();   
    public selectedItem = 0;
    totalEmployee: number = 0;
    FORM_ID = 'AC_1290'   
    IS_CAN_SAVE:boolean;
    APPSET_NO:number;
    APPSETDTL_NO:number;
    APP_PROCESSTYPE_NO:number;
    scheduleList: any = [];
    reqStatusList: any = [];
    paymentType: any = [];
    reqPriorityModel: any = [];
    particularList :any = [];
    masterList :any = [];
    masterDtlList :any = [];
    appUserlList :any = [];
    appPrvgList :any = [];
    appModalUserlList :any = [];
    transferStatusList:any=[];
    TYPE_LIST:any =[];
    public reportInfoList:any = [];
    public roundList: any = [];


    constructor(private utilService:UtilityService) { }

}
