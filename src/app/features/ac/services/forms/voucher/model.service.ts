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

    //Backup
    voucherBackup:Voucher;
    voucherDtlBackup:VoucherDtl[];
    //

    showPaidTo: boolean = false;
    showReceiveFrom: boolean = false;
    showCostName: boolean = false;

    // dropdown list
    voucherTypeList: any = [];
    periodList: any = [];
    payOrReceiveList: any = [];
    costNameList: any = [];
    currencyList: any = [];

    selectedPeriod:Period = new Period();
    userPrivilege:UserPrivileges = new UserPrivileges();
    FORM_ID = 'AC_1004';
    postCheckObj: any = {
        IS_INTEGRATE: null,
        IS_POST: null,
        POST_DEL_CHK: null,
        POST_EDT_CHK: null
    }

    selectedVoucher = {ACC_PATH:''}
    roundlIist: any = [];

    constructor(private utilService:UtilityService) { }

    // setVisibility
    public setVisibility(vtypeNo: any): void {
        let voucherNo = parseInt(vtypeNo);
        this.showPaidTo = false;
        this.showReceiveFrom = false;
        this.showCostName = false;

        if (voucherNo === fixedValues.voucherType.DebitVoucher) { // Enum 1 means Debit
            this.showPaidTo = true;
        }
        else if (voucherNo === fixedValues.voucherType.CreditVoucher) { // Enum 1 means Credit
            this.showReceiveFrom = true;
        }
        else if (voucherNo === fixedValues.voucherType.PurchaseVoucher) {
            this.showCostName = true;
        }
    }

    setSelectdPeriod (_periodList, _PERIOD_NO) {
        _periodList.forEach(element => {
            if(element.PERIOD_NO == _PERIOD_NO) {
                this.selectedPeriod = new Period(element);
            }
        });
    }

    getDrCrList () {
        return this.utilService.getEnumList(fixedValues.transactionType);
    }

}
