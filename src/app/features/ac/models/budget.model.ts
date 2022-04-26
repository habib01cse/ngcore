import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { BudgetDetail } from './budget-details';
/**
 * Model  Budget
 */

export class Budget extends BaseEntity {
    BU_NAME: string;
    BUDGET_NO: number;
    BUDGET_PERIOD_NO: number;
    BU_NO: number;
    REQ_AMT: number;
    RCV_AMT: number;
    APP_AMT: number;
    APPROVE_AMT: number;
    CONSUMED_AMT: number;
    PENDING_AMT: number;
    TRANSFER_AMT:number;
    
    BU_NAME_TR:string;
    BU_NO_TR:number;
    ACC_NAME_TR:string;
    ACC_NO_TR:number;
    ACC_NO:number;
    ACC_CODE:string;
    ACC_NAME:string;
    REMARKS:string;
    APPROVE_FLAG:boolean;
    CHECK_FLAG:boolean;
    STATUS:number;
    STATUS_NAME:string;
    STATUS_BY:string;

    CHECK:boolean;


    COMMENTS_VERIFY:string;
    COMMENTS_FIN_CHK:string;
    COMMENTS_APPROVE:string;
    COMMENTS_BU:string;
    BUDGETTRANS_NO:number;
    budgetDtlList:Array<BudgetDetail>;

    

    constructor(options: any = {}) {
        super(options);

        this.BU_NAME = options.BU_NAME || '';
        this.BUDGET_NO = options.BUDGET_NO || null;
        this.BUDGET_PERIOD_NO = options.BUDGET_PERIOD_NO || null;
        this.BU_NO = options.BU_NO || null;
        this.RCV_AMT = options.RCV_AMT || 0;
        this.REQ_AMT = options.REQ_AMT || 0;
        this.APPROVE_AMT = options.APPROVE_AMT || 0;
        this.APP_AMT = options.APP_AMT || 0;
        this.CONSUMED_AMT = options.CONSUMED_AMT || 0;
        this.PENDING_AMT = options.PENDING_AMT || 0;
        this.TRANSFER_AMT = options.TRANSFER_AMT || 0;

        this.BU_NAME_TR = options.BU_NAME_TR || '';
        this.BU_NO_TR = options.BU_NO_TR || null;
        this.ACC_NAME_TR = options.ACC_NAME_TR || '';
        this.ACC_NO_TR = options.ACC_NO_TR || null;

        this.ACC_NO = options.ACC_NO || null;
        this.ACC_CODE = options.ACC_CODE || '';
        this.ACC_NAME = options.ACC_NAME || '';
        this.REMARKS = options.REMARKS || '';
        this.APPROVE_FLAG = options.APPROVE_FLAG || null;
        this.CHECK_FLAG = options.CHECK_FLAG || 0;
        this.STATUS = options.STATUS || null;
        this.STATUS_NAME = options.STATUS_NAME || '';
        this.STATUS_BY = options.STATUS_BY || '';
        
        this.CHECK = options.CHECK || false;
        this.COMMENTS_VERIFY = options.COMMENTS_VERIFY || '';
        this.COMMENTS_FIN_CHK = options.COMMENTS_FIN_CHK || '';
        this.COMMENTS_APPROVE = options.COMMENTS_APPROVE || '';
        this.COMMENTS_BU = options.COMMENTS_BU || '';
        this.BUDGETTRANS_NO = options.BUDGETTRANS_NO || null;

        this.budgetDtlList = [];

       
    }
}
