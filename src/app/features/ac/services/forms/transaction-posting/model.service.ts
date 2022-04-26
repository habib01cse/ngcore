/* angular stuff */
import { Injectable } from '@angular/core';
import { TransactionDlt } from '../../../models/transaction-dtl';
import { Transaction } from '../../../models/transection.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

/* 3rd party libraries */


@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public POST_BY: number = null;
    public EMP_NAME: string = null;
    public BU_NO: number = null;
    public STORE_NAME: string = null;
    public TRNTYPE_NO: number = null;
    public TRN_NAME: string = null;
    public ITEM_NO: number = null;
    public ITEM_NAME: string = null;
    public ITEM_PATH: string = null;

    public trunTypeList = [];
    public storesList = [];
    public postTrnList = [];
    public iteamsList = [];
    public trunPostNoList = [];
    public trunPostList: Transaction[]  = new Array<Transaction>();
    public trunPostDtlList: TransactionDlt[] = new Array<TransactionDlt>();
    public trunPostDtlListBackUp: TransactionDlt[] = new Array<TransactionDlt>();
    public selectedTrunType: number = 0;
    public selectedItem:  number = 0;
    public selectedStore: number = 0;
    public selectedPostedBy: number = 0;
    public firstTrnNumber: number = null;
    public selectedTrnNo: number =  null;
    public discription: string =  '';
    public selectedTransection: Transaction = new Transaction();
    userPrivilege = new UserPrivileges();
    public reportInfo: any = [];
  

    constructor() {
    }

    init() {}


    private displayError(ex): void {
        console.log(ex);
    }

}
