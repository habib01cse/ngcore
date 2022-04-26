import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequePrepared extends BaseEntity {
    PREPARE_DATE: any;
    CUR_NO: number;
    C_NAME: string;
    CUR_ID: string;
    EXCHANGE_RATE: number;
    BA_NO: number;
    BA_NAME: string;
    CHECK_DATE: any;
    COST_NO: number;
    COST_NAME: string;
    STATUS: string;
    COMPANY_NAME: string;
    COMPANY_NO: number;
    EMP_NAME_ID: string;
    EMP_NO: number;
    SIGNATORY_EMP_NO: number;
    JOBTITLE: string;
    SETTLEMENT: string;
    TYPE_NAME: string;
    FINAL_SETTLEMENT_DATE: any;
    FINAL_SETTLEMENT_TYPE: any;
    V_ID: string;
    DESCR: string;
    AC_COUNT: string;
    CHECK_ID: string;   
    CHECK_NO: string;
    CUR_NAME: string;
    PAY_ID: string;
    PAY_TO_NAME: string;
    POST_DATE: any;
    V_NO: number;
    VOID_FLAG: number;
    MANUAL_VOUCHER_FLAG: number;
    CHECK_STAT_NO: number;
    IS_GL_POST: number;
    ACTIVE_STAT: number;
    CHECK_AMT: number;
    VTYPE_NO: number;
    CHEQUE_COMPANY_NO: number;
    REGISTER_NO: number;
    PAY_TO_ACC_NO: number;
    SUM_AMT: number;
    MANUAL_FLG: number;

    PAY_TO_ACC_CHK : number;
    TTL_AMOUNT_CHK : number;
    
    constructor(options: any = {}) {
        super(options);
       // this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        this.PREPARE_DATE = (options.PREPARE_DATE) ? new Date(options.PREPARE_DATE) : null;
        this.CUR_NO = options.CUR_NO || null;
        this.C_NAME = options.C_NAME || '';
        this.CUR_ID = options.CUR_ID || '';
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.BA_NO = options.BA_NO || null;
        this.BA_NAME = options.BA_NAME || '';
        this.CHECK_DATE = (options.CHECK_DATE) ? new Date(options.CHECK_DATE) : null;
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || '';
        this.STATUS = options.STATUS || '';
        this.COMPANY_NAME = options.COMPANY_NAME || '';
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.EMP_NO = options.EMP_NO || null;
        this.SIGNATORY_EMP_NO = options.SIGNATORY_EMP_NO || null;
        this.JOBTITLE = options.JOBTITLE || '';
        this.SETTLEMENT = options.SETTLEMENT || '';
        this.TYPE_NAME = options.TYPE_NAME || '';
        this.FINAL_SETTLEMENT_TYPE = options.FINAL_SETTLEMENT_TYPE || null;
        this.FINAL_SETTLEMENT_DATE = (options.FINAL_SETTLEMENT_DATE) ? new Date(options.FINAL_SETTLEMENT_DATE) : null;
        this.V_ID = options.V_ID || '';
        this.DESCR = options.DESCR || '';
        this.AC_COUNT = options.AC_COUNT || '';
        this.CHECK_ID = options.CHECK_ID || '';
        this.CHECK_NO = options.CHECK_NO || null;
        this.CUR_NAME = options.CUR_NAME || '';
        this.PAY_ID = options.PAY_ID || '';
        this.PAY_TO_NAME = options.PAY_TO_NAME || '';
       // this.POST_DATE = (options.POST_DATE) ? new Date(options.POST_DATE) : new Date();
        this.POST_DATE = (options.POST_DATE) ? new Date(options.POST_DATE) : null;
        this.V_NO = options.V_NO || null;
        this.VOID_FLAG = options.VOID_FLAG || null;
        this.MANUAL_VOUCHER_FLAG = options.MANUAL_VOUCHER_FLAG || null;
        this.CHECK_STAT_NO = options.CHECK_STAT_NO || null;
        this.ACTIVE_STAT = options.ACTIVE_STAT || null;
        this.CHECK_AMT = options.CHECK_AMT || null;
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.CHEQUE_COMPANY_NO = options.CHEQUE_COMPANY_NO || null;
        this.REGISTER_NO = options.REGISTER_NO || null;
        this.PAY_TO_ACC_NO = options.PAY_TO_ACC_NO || null;
        this.SUM_AMT = options.SUM_AMT || null;
        this.MANUAL_FLG = options.MANUAL_FLG || null;

        this.PAY_TO_ACC_CHK = options.PAY_TO_ACC_CHK || null;
        this.TTL_AMOUNT_CHK = options.TTL_AMOUNT_CHK || null;       
        this.IS_GL_POST = options.IS_GL_POST == 1 ? 1 : 0;

        

    }
}

