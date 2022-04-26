import { BaseEntity } from "src/app/core/models/base-entity"
export class MoneyPay extends BaseEntity {
    MONEYPAY_NO: number;
    MONEYPAY_ID: string;
    PAY_DATE: Date;
    DESCR: string;
    V_NO: number;
    GL_POSTDATE: Date;
    PAY_VTYPE_NO: number;
    PAYMENT_FORM: string;
    SUPPLIER_NAME: string;
    // Non Db
    GL_CHECK: number;
    VOUCHER_TYPE: string;
    PRDATE: Date;
    GL_POST_FLAG: number;
    S_GL_CHECK: number;   
    COMPANY_NO: number;   
    V_ID: string;
    TYPE_NAME: string;
    TRN_LIST: string;
    LC_DATE: Date;
    DR_EX: number;

    constructor(options: any = {}) {
        super(options);
        this.MONEYPAY_NO = options.MONEYPAY_NO ? options.MONEYPAY_NO : null;
        this.DR_EX = options.DR_EX ? options.DR_EX : null;
        this.MONEYPAY_ID = options.MONEYPAY_ID ? options.MONEYPAY_ID : null;
        this.PAY_DATE = options.PAY_DATE ? new Date(options.PAY_DATE) : new Date();
        this.LC_DATE = options.LC_DATE ? new Date(options.LC_DATE) : new Date();
        this.DESCR = options.DESCR ? options.DESCR : null;
        this.V_NO = options.V_NO ? options.V_NO : null;
        this.GL_POSTDATE = options.GL_POSTDATE ? new Date(options.GL_POSTDATE) : null;
        this.PRDATE = options.PRDATE ? new Date(options.PRDATE) : null;
        this.GL_POST_FLAG = options.GL_POST_FLAG == 1 ? 1 : 0 ;
        this.S_GL_CHECK = options.GL_CHECK ? options.GL_CHECK : null;
        this.PAY_VTYPE_NO = options.PAY_VTYPE_NO ? options.PAY_VTYPE_NO : null;
        this.COMPANY_NO = options.COMPANY_NO ? options.COMPANY_NO : null;
        this.PAYMENT_FORM = options.PAYMENT_FORM ? options.PAYMENT_FORM : null;
        this.V_ID = options.V_ID ? options.V_ID : null;
        this.TYPE_NAME = options.TYPE_NAME ? options.TYPE_NAME : null;
        this.SUPPLIER_NAME = options.SUPPLIER_NAME ? options.TYPE_NAME : '';
        this.TRN_LIST = options.TRN_LIST ? options.TRN_LIST : '';
        this.GL_CHECK = options.GL_CHECK == 1 ? 1 : 0;

    }

}