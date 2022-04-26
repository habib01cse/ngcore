import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class DeleveryReg {
    ACC_NAME: string;
    ACC_NO: number;
    ACC_CODE: number;
    ACC_PATH: string;
    AIT: number;
    AIT_FLAG: number;
    BU_NAME: string;
    COMMISSION_VALUE: number;
    CUSTOMER_NAME: string;
    CUSTOMER_NO: number;
    DEL_TYPE: string;
    DOCUMENT_ID: string;
    GL_POSTDATE: string;
    GRAND_TOTAL: number;
    INCENTIVE: number;
    INC_FLAG: number;
    ISU_QTY: number;
    NOTE: string;
    ORDER_TYPE: number;
    ORDER_TYPE_NAME: string;
    PI_SI_ID: string;
    REF_NAME: string;
    REF_NO: number;
    SC_FLAG: number;
    SO_ID: string;
    SO_NO: number;
    TRN_DATE: any;
    TRN_ID: string;
    TRN_NO: number;
    V_ID: string;
    V_NO: string;
    GL_POST_FLAG: number;
    CURR_BU: number;
    EXCHANGE_RATE: number;
    CURRENCY_NO: number;
    NARATION: string;
    COMPANY_NO: number;
    ORDER_FORM: string;
    TRNTYPE_NO: number;
    CHK_AIT: number;
    CHK_INC: number;
    CHK_SC: number;
    RCV_QTY: number;
    TO_STORE_NAME: string;
    REF_COMPANY_NO: number;
    CONTRACT_NO: number;
    DOC_AMENDMENT: number;


    constructor(options: any = {}) {

        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_CODE = options.ACC_CODE || null;
        this.ACC_PATH = options.ACC_PATH || '';
        this.AIT = options.AIT || null;
        this.AIT_FLAG = options.AIT_FLAG == 1 ? 1 : 0;
        this.BU_NAME = options.BU_NAME || '';
        this.COMMISSION_VALUE = options.COMMISSION_VALUE || null;
        this.CUSTOMER_NAME = options.CUSTOMER_NAME || '';
        this.CUSTOMER_NO = options.CUSTOMER_NO || null;
        this.DEL_TYPE = options.DEL_TYPE || null;
        this.DOCUMENT_ID = options.DOCUMENT_ID || '';
        this.DOCUMENT_ID = options.DOCUMENT_ID || '';
        this.GRAND_TOTAL = options.GRAND_TOTAL || null;
        this.INCENTIVE = options.INCENTIVE || null;
        this.INC_FLAG = options.INC_FLAG == 1 ? 1 : 0;
        this.ISU_QTY = options.ISU_QTY || null;
        this.NOTE = options.NOTE || '';
        this.ORDER_TYPE = options.ORDER_TYPE || null;
        this.ORDER_TYPE_NAME = options.ORDER_TYPE_NAME || '';
        this.PI_SI_ID = options.PI_SI_ID || '';
        this.REF_NAME = options.REF_NAME || '';
        this.REF_NO = options.REF_NO || null;
        this.SC_FLAG = options.SC_FLAG == 1 ? 1 : 0;
        this.SO_ID = options.SO_ID || '';
        this.SO_NO = options.SO_NO || null;
        this.TRN_DATE = options.TRN_DATE ? new Date(options.TRN_DATE) : null;
        this.TRN_ID = options.TRN_ID || '';
        this.TRN_NO = options.TRN_NO || null;
        this.V_ID = options.V_ID || '';
        this.V_NO = options.V_NO || '';
        this.GL_POST_FLAG = options.GL_POST_FLAG == 1 ? 1 : 0;
        this.CURR_BU = options.CURR_BU || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.CURRENCY_NO = options.CURRENCY_NO || null;
        this.NARATION = options.NARATION || '';
        this.ORDER_FORM = options.ORDER_FORM || '';
        this.TRNTYPE_NO = options.TRNTYPE_NO || '';
        this.CHK_AIT = options.CHK_AIT || 0;
        this.CHK_INC = options.CHK_INC || 0;
        this.CHK_SC = options.CHK_SC || 0;
        this.GL_POSTDATE = options.GL_POSTDATE || null;
        this.RCV_QTY = options.RCV_QTY || null;
        this.TO_STORE_NAME = options.TO_STORE_NAME || '';
        this.REF_COMPANY_NO = options.REF_COMPANY_NO || null;
        this.CONTRACT_NO = options.CONTRACT_NO || null;
        this.DOC_AMENDMENT = options.DOC_AMENDMENT || null;


    }
}
