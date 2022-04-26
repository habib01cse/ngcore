import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Model of AC_1003 Bank information
 * Data Base Table name:AC_BANKDTL
 */

export class BudgetTransfer extends BaseEntity {
    APP_BY_JOBTITLE:string
    PERIOD_NAME:string;
    PERIOD_NO:number;
    FROM_BUDGET_NO:number;
    FROM_BU_NO:number;
    FROM_ACC_NO:number;
    TRANSFER_DATE: Date;
    FROM_BU_NAME: string;
    FROM_ACC_NAME: string;
    TO_BU_NAME: string;
    TRANS_AMT: number;
    BUDGETTRANS_NO: number;
    BUDGET_APP_AMT: number;
    PENDING_AMT: number;
    ACCEPT_BY_NAME: string;
    CTRL_ACCEPT_COMMENTS: string;
    ACCEPT_COMMENTS: number;
    SUBMIT_BY_NAME: string;
    SUBMIT_DATE: Date;
    APP_BY_NAME:string;
    APP_FLAG: number;
    APP_DATE: Date;
    APP_STATUS: string;
    TO_BU_NO: number;
    SUBMIT_BY_JOBTITLE: string;
    ACCEPT_FLAG: number;
    SQL_STATE: number;

    constructor(options: any = {}) {
        super(options);
        this.APP_BY_JOBTITLE = options.APP_BY_JOBTITLE || '';
        this.PERIOD_NAME = options.PERIOD_NAME || '';
        this.PERIOD_NO = options.PERIOD_NO || null;
        this.FROM_BUDGET_NO = options.FROM_BUDGET_NO || null;
        this.FROM_BU_NO = options.FROM_BU_NO || null;
        this.FROM_ACC_NO = options.FROM_ACC_NO || null;
        this.TRANSFER_DATE = (options.TRANSFER_DATE) ? new Date(options.TRANSFER_DATE) : null;
        this.FROM_BU_NAME = options.FROM_BU_NAME || '';
        this.FROM_ACC_NAME = options.FROM_ACC_NAME || '';
        this.TO_BU_NAME = options.TO_BU_NAME || '';
        this.TRANS_AMT = options.TRANS_AMT || null;
        this.BUDGETTRANS_NO = options.BUDGETTRANS_NO || null;
        this.BUDGET_APP_AMT = options.BUDGET_APP_AMT || null;
        this.PENDING_AMT = options.PENDING_AMT || null;
        this.ACCEPT_BY_NAME = options.ACCEPT_BY_NAME || '';
        this.CTRL_ACCEPT_COMMENTS = options.CTRL_ACCEPT_COMMENTS || '';
        this.ACCEPT_COMMENTS = options.ACCEPT_COMMENTS || null;
        this.SUBMIT_BY_NAME = options.SUBMIT_BY_NAME || '';
        this.SUBMIT_DATE = (options.SUBMIT_DATE) ? new Date(options.SUBMIT_DATE) : null;
        this.APP_BY_NAME = options.APP_BY_NAME || '';
        this.APP_FLAG = options.APP_FLAG || ( options.APP_FLAG == 0 ? 0 : 2);
        this.APP_DATE = (options.APP_DATE) ? new Date(options.APP_DATE) : null;
        this.APP_STATUS = options.APP_STATUS || '';
        this.TO_BU_NO = options.TO_BU_NO || null;
        this.SUBMIT_BY_JOBTITLE = options.SUBMIT_BY_JOBTITLE || '';
        this.ACCEPT_FLAG = options.ACCEPT_FLAG == 1 ? 1 : 0;  
        this.SQL_STATE = options.SQL_STATE || (options.SQL_STATE === fixedValues.sqlState.sqlUnchange ? fixedValues.sqlState.sqlUnchange : fixedValues.sqlState.sqlInsert);    
    }
}

