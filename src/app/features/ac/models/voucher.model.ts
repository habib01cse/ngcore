import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Form name TS_Accounts Category(AC_1012).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */

/**
 * Database table name is AC_VOUCHER
 */

export class Voucher extends BaseEntity {
    V_NO: string;
    V_ID: string;
    VTYPE_NO: number;
    VOUCHER_TYPE: string;
    PERIOD_NO: number;
    START_PERIOD_DATE:any;
    END_PERIOD_DATE:any;
    V_DATE: any;
    MODULE: string;
    VOID_FLAG: string;
    PAID_TO: number;
    RECEIVE_FROM: number;
    COST_NO: number;
    CUR_NO: number;
    NARRATION: string;
    totalDR:number;
    totalCR:number;
    APPROVE_BY: string;
    APPROVE_DATE: string;
    CHECK_BY: number;
    CHECK_BY_NAME: string;
    CHECK_DATE: string;
    PREPARED_BY: string;
    PREPARED_DATE: string;
    ACC_PATH: string;
    CHECK_FLAG: number;
    POST_FLG: number;
    PAID_TO_NAME: string;
    voucherDtlList: VoucherDtl[];
    transactionTypeList: any[];
    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// Voucher class attribute
        this.V_NO = options.V_NO || null;
        this.V_ID = options.V_ID || null;
        this.PAID_TO_NAME = options.PAID_TO_NAME || null;
        this.VTYPE_NO = parseInt(options.VTYPE_NO) || null;
        this.VOUCHER_TYPE = options.VOUCHER_TYPE || null;
        this.PERIOD_NO = parseInt(options.PERIOD_NO) || null;
        this.V_DATE = options.V_DATE?new Date(options.V_DATE):new Date();
        this.START_PERIOD_DATE = options.START_PERIOD_DATE?new Date(options.START_PERIOD_DATE):null;
        this.END_PERIOD_DATE = options.END_PERIOD_DATE?new Date(options.END_PERIOD_DATE):null;
        this.MODULE = options.MODULE || 'Accounts';
        this.VOID_FLAG = options.VOID_FLAG || 'N';
        this.PAID_TO = parseInt(options.PAID_TO) || null;
        this.RECEIVE_FROM = options.RECEIVE_FROM || null;
        this.COST_NO = options.COST_NO || null;
        this.CUR_NO = options.CUR_NO || null;
        this.NARRATION = options.NARRATION || null;
        this.totalDR = options.totalDR || 0;
        this.totalCR = options.totalCR || 0;
        this.APPROVE_BY = options.APPROVE_BY || '';
        this.APPROVE_DATE = options.APPROVE_DATE || '';
        this.CHECK_BY = options.CHECK_BY || null;
        this.CHECK_BY_NAME = options.CHECK_BY_NAME || '';
        this.CHECK_DATE = options.CHECK_DATE || '';
        this.PREPARED_BY = options.PREPARED_BY || '';
        this.PREPARED_DATE = options.PREPARED_DATE || '';
        this.ACC_PATH = options.ACC_PATH || '';
        this.CHECK_FLAG = options.CHECK_FLAG || null;
        this.POST_FLG = options.POST_FLG == 1 ? 1 : 0;
        this.transactionTypeList = options.transactionTypeList || [];
        this.voucherDtlList = [];
    }
}

/**
 * Database table name is AC_VOUCHERDTL
 */

export class VoucherDtl extends BaseEntity {
    DR_CR: string;
    VDTL_NO: number;
    V_ID: string;
    V_NO: number;
    ACC_NO: number;
    ACC_CODE: string;
    ACC_NAME: string;
    ACC_PATH: string;
    BA_NO: number;
    BA_NAME: string;
    MAP_ACC_NO: any;
    MAP_ACC_NAME: string;
    businessAreaList: any[];
    referenceList: any[];
    NARRATION: string;
    COST_NO: number;
    COST_NAME: string;
    REF_NO: number;
    REF_NAME: string;
    CUR_NO: number;
    CUR_NAME: string;
    C_NAME_RATE: string;
    EXCHANG_RATE: number;
    DR: number;
    CR: number;
    VTYPE_NO: number;
    TYPE_NAME: string;
    POST_DATE: any;
    CHK_REC_NO: string;
    CHK_REC_DATE: any;
    CHEQUE_NO: number;
    CHEQUE_DATE: any;
    BANK_NAME: string;
    BANK_ACCNO: string;
    CHK_DEP_DATE: any;
    CHK_VOID_DATE: any;
    DR_EX:number;
    CR_EX:number;
    BASIC_CURRENCY: string;
    COST_FLG: number;
    BA_FLG: number;
    COST_SEL_TYPE: string;
    BA_SEL_TYPE: string;
    CHK_DESCRIPTION: string;
    VOID_FLAG: string;
    REF_V_NO: number;
    REF_V_ID: string;
    SQL_STATE: number;
    _PK:string;
    _ID:string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// Voucher class attribute
        this.VOID_FLAG = options.VOID_FLAG || 'N';
        this.COST_FLG = options.COST_FLG || 0;
        this.BA_FLG = options.BA_FLG || 0;
        this.COST_SEL_TYPE = options.COST_SEL_TYPE || "O";
        this.BA_SEL_TYPE = options.BA_SEL_TYPE || "O";
        this.DR_CR = options.DR_CR || "Dr";
        this.REF_V_NO = options.REF_V_NO || null;
        this.REF_V_ID = options.REF_V_ID || null;
        this.BASIC_CURRENCY = options.BASIC_CURRENCY || null;
        this.V_ID = options.V_ID || null;
        this.V_NO = options.V_NO || null;
        this.VDTL_NO = options.VDTL_NO || null;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_CODE = options.ACC_CODE || null;
        this.ACC_NAME = options.ACC_NAME || null;
        this.ACC_PATH = options.ACC_PATH || null;
        this.BA_NO = options.BA_NO || null;
        this.MAP_ACC_NAME = options.MAP_ACC_NAME || null;
        this.BA_NAME = options.BA_NAME || null;
        this.COST_NAME = options.COST_NAME || null;
        this.REF_NAME = options.REF_NAME || null;
        this.CUR_NAME = options.CUR_NAME || null;
        this.MAP_ACC_NO = options.MAP_ACC_NO || null;
        this.businessAreaList = options.businessAreaList || [];
        this.referenceList = options.referenceList || [];
        this.NARRATION = options.NARRATION || null;
        this.COST_NO = options.COST_NO || null;
        this.REF_NO = options.REF_NO || null;
        this.CUR_NO = options.CUR_NO || null;
        this.C_NAME_RATE = options.C_NAME_RATE || null;
        this.EXCHANG_RATE = options.EXCHANG_RATE || null;
        this.DR = options.DR || null;
        this.CR = options.CR || null;
        this.DR_EX = (options.DR_CR && options.DR_CR.toLowerCase() == 'dr')?(options.DR * options.EXCHANG_RATE):null;
        this.CR_EX = (options.DR_CR && options.DR_CR.toLowerCase() == 'cr')?(options.CR * options.EXCHANG_RATE):null;
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.TYPE_NAME = options.TYPE_NAME || null;
        this.POST_DATE = (options.POST_DATE) ? new Date(options.POST_DATE): null;
        this.CHK_REC_NO = options.CHK_REC_NO || null;
        this.CHK_REC_DATE = options.CHK_REC_DATE ? new Date(options.CHK_REC_DATE) : null;
        this.CHEQUE_NO = options.CHEQUE_NO || null;
        this.CHEQUE_DATE = options.CHEQUE_DATE ? new Date(options.CHEQUE_DATE) : null;
        this.BANK_NAME = options.BANK_NAME || null;
        this.BANK_ACCNO = options.BANK_ACCNO || null;
        this.CHK_DESCRIPTION = options.CHK_DESCRIPTION || null;
        this.CHK_DEP_DATE = options.CHK_DEP_DATE ? new Date(options.CHK_DEP_DATE) : null;
        this.CHK_VOID_DATE = options.CHK_VOID_DATE ? new Date(options.CHK_VOID_DATE) : null;

        this._PK = 'VDTL_NO';
        this._ID = 'VDTL_ID';
        
    }
}
