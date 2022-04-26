/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { VoucherDtl } from '../../../models/voucher-dtl.model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public NARRATION: String;
  public selectedVoucher: any = {};

  public moduleList = [];
  public voucherTypeList = [];
  public costCenterList = [];
  public businessAreaList = [];
  public userList = [];
  public fvoucherList = [];
  public coaList = [];
  public roundlIist = [];
  public acCommConfig: any = {};
  public selectedVID = '';
  public status = {
    CHECK_STATUS: 1,
    UNCHECK_STATUS: 0
  };


  public voucherList = [];
  public voucherDtlList = [];
  public voucherDtlListBackup = new Array<VoucherDtl>();

  public totalBaseDrAmount = 0;
  public totalBaseCrAmount = 0;

  public selectedAccountPath;
  userPrivilege = new UserPrivileges()

  constructor() { }

  // checkUncheckAll
  public checkUncheckAll(isChecked: boolean): void {
    if (isChecked) {
      for (const voucher of this.voucherList) {
        voucher.CHECK_FLAG = 1;
      }
    }
  }  
}
