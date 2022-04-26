import { BaseEntity } from 'src/app/core/models/base-entity';

/**
 * Form name TS_Accounts Category(AC_1012).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */

/**
 * Database table name is AC_VOUCHERDTL
 */

export class VoucherDtl extends BaseEntity {
    VDTL_NO: number;
    VDTL_ID: string;
    ACC_NO: number;
    BA_NO: number;
    CHK_REC_NO: string;
    CHK_REC_DATE: Date;
    CHEQUE_NO: number;
    CHEQUE_DATE: Date;
    BANK_NAME: string;
    BANK_ACCNO: string;
    CHK_DEP_DATE: Date;
    CHK_VOID_DATE: Date;
    COST_FLG: number;
    BA_FLG: number;
    COST_SEL_TYPE: string;
    BA_SEL_TYPE: string;
    COST_NAME: string;
    BA_NAME: string;

    // user for AC_1010
    ACC_CODE: string;
    ACC_NAME: string;
    ACC_PATH: string;
    BASE_CR: number;
    BASE_DR: number;
    CHK_DESCRIPTION: string;
    COST_NO: number;
    CR: number;
    CUR_NAME: string;
    CUR_NO: number;
    DR: number;
    DR_CR: string;
    EXCHANG_RATE: number;
    MAP_ACC_NAME: string;
    NARRATION: string;
    REF_NAME: string;
    REF_NO: number;
    SQL_STATE: number;
    TYPE_NAME: string;
    VTYPE_NO: number;
    V_ID: string;
    V_NO: number;

    _PK:string;
    _ID:string;
    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// Voucher class attribute
        this.VDTL_NO = options.VDTL_NO || null;
        this.VDTL_ID = options.VDTL_ID || '';
        this.BA_FLG = options.BA_FLG || 0;
        this.ACC_NO = options.ACC_NO || null;
        this.BA_NO = options.BA_NO || null;
        this.COST_SEL_TYPE = options.COST_SEL_TYPE || "O";
        this.BA_SEL_TYPE = options.BA_SEL_TYPE || "O";
        this.BA_NAME = options.BA_NAME || null;
        this.COST_NAME = options.COST_NAME || null;
        this.CHK_REC_NO = options.CHK_REC_NO || null;
        this.CHK_REC_DATE = options.CHK_REC_DATE;
        this.CHEQUE_NO = options.CHEQUE_NO || 0;
        this.CHEQUE_DATE = options.CHEQUE_DATE;
        this.BANK_NAME = options.BANK_NAME || null;
        this.BANK_ACCNO = options.BANK_ACCNO || null;
        this.CHK_DEP_DATE = options.CHK_DEP_DATE;
        this.CHK_VOID_DATE = options.CHK_VOID_DATE;

        // user for AC_1010
        this.ACC_CODE = options.ACC_CODE || '';
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_PATH = options.ACC_PATH || '';
        this.BASE_CR = options.BASE_CR || (options.BASE_CR === 0 ? 0 : null);
        this.BASE_DR = options.BASE_DR || (options.BASE_DR === 0 ? 0 : null);
        this.CHK_DESCRIPTION = options.CHK_DESCRIPTION || '';
        this.COST_NO = options.COST_NO || null;
        this.CR = options.CR || (options.CR === 0 ? 0 : null);
        this.CUR_NAME = options.CUR_NAME || '';
        this.CUR_NO = options.CUR_NO || null;
        this.DR = options.DR ||(options.DR === 0 ? 0 : null);
        this.DR_CR = options.DR_CR || '';
        this.EXCHANG_RATE = options.EXCHANG_RATE || '';
        this.MAP_ACC_NAME = options.MAP_ACC_NAME || '';
        this.NARRATION = options.NARRATION || '';
        this.REF_NAME = options.REF_NAME || '';
        this.REF_NO = options.REF_NO || null;
        this.TYPE_NAME = options.TYPE_NAME || '';
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.V_ID = options.V_ID || '';
        this.V_NO = options.V_NO || null;




        this._PK = 'VDTL_NO';
        this._ID = 'VDTL_ID';
    }
}

