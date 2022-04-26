import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class PaymentRegister extends BaseEntity {

    ACCEPTANCE_DATE: Date;
    ACCEPTANCE_VALUE: number;
    INVOICE_VAL_IN_TK: number;
    AUDITED_VALUE: number;
    BANK_ACCEPT_DATE: Date;
    BBLC_DATE: Date;
    BBLC_ID: string;
    BBLC_NO: number;
    BILL_PAYNO: number;
    BILL_PAYID: string;
    CUR_NAME: string;
    EXCHANGE_RATE: number;
    INVOICE_DATE: Date;
    INVOICE_VALUE: number;
    LC_TYPE: string;
    MATURITY_DATE: Date;
    PAYMENT_DATE: Date;
    PAYMENT_POSTDATE: Date;
    PAYMENT_V_ID: string;
    PI_ID: string;
    PAY_AMT: number;
    PENDING_VALUE: number;
    PENDING_VALUE_BASE: number;
    PROVISION_V_DATE: Date;
    PROVISION_V_ID: string;
    SUPPDOC_ID: string;
    SUPPINVOICE_ID: string;
    SUPPLIER_NAME: string;
    SELECT_CHECKBOX: number;
    V_NO: number;
    ITEM_TYPE: string;
    DEDUCTION: number;
    SUPPDOC_NO: number;    
    IMPORT_NO: number;    
    PAYMENT_V_NO: number;    
    AUDIT_STATUS: string;
    SQL_STATE: number;
    PROVISION_V_NO:number;
    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        this.ACCEPTANCE_DATE = (options.ACCEPTANCE_DATE) ? new Date(options.ACCEPTANCE_DATE) : null;
        this.ACCEPTANCE_VALUE = options.ACCEPTANCE_VALUE || null ;
        this.INVOICE_VAL_IN_TK = options.INVOICE_VAL_IN_TK || null ;
        this.AUDITED_VALUE = options.AUDITED_VALUE || null;
        this.BANK_ACCEPT_DATE = (options.BANK_ACCEPT_DATE) ? new Date(options.BANK_ACCEPT_DATE) : null;
        this.BBLC_DATE = (options.BBLC_DATE) ? new Date(options.BBLC_DATE) : null;
        this.BBLC_ID = options.BBLC_ID || "";
        this.BBLC_NO = options.BBLC_NO || null;
        this.BILL_PAYID = options.BILL_PAYID || "";
        this.BILL_PAYNO = options.BILL_PAYNO || null;
        this.CUR_NAME = options.CUR_NAME || "";
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.INVOICE_DATE = (options.INVOICE_DATE) ? new Date(options.INVOICE_DATE) : null;
        this.INVOICE_VALUE = options.INVOICE_VALUE || null;
        this.LC_TYPE = options.LC_TYPE || "";
        this.MATURITY_DATE = (options.MATURITY_DATE) ? new Date(options.MATURITY_DATE) : null;
        this.PAYMENT_DATE = (options.PAYMENT_DATE) ? new Date(options.PAYMENT_DATE) : null;
        this.PAYMENT_POSTDATE = (options.PAYMENT_POSTDATE) ? new Date(options.PAYMENT_POSTDATE) : null;
        this.PAYMENT_V_ID = options.PAYMENT_V_ID || "";
        this.PI_ID = options.PI_ID || "";
        this.PAY_AMT = options.PAY_AMT || null;
        this.PENDING_VALUE = options.PENDING_VALUE || null;
        this.PENDING_VALUE_BASE = options.PENDING_VALUE_BASE || null;
        this.PROVISION_V_DATE = (options.PROVISION_V_DATE) ? new Date(options.PROVISION_V_DATE) : null;
        this.PROVISION_V_ID = options.PROVISION_V_ID || "";
        this.SUPPDOC_ID = options.SUPPDOC_ID || "";
        this.SUPPINVOICE_ID = options.SUPPINVOICE_ID || "";
        this.SUPPLIER_NAME = options.SUPPLIER_NAME || "";
        this.V_NO = options.V_NO ;
        this.ITEM_TYPE = options.ITEM_TYPE || "";
        this.DEDUCTION = options.DEDUCTION || null;
        this.SUPPDOC_NO = options.SUPPDOC_NO || null;
        this.IMPORT_NO = options.IMPORT_NO || null;
        this.PAYMENT_V_NO = options.PAYMENT_V_NO || null;
        this.AUDIT_STATUS = options.AUDIT_STATUS || "";
        this.SELECT_CHECKBOX = options.SELECT_CHECKBOX === 1 ? 1 : 0;      
        this.PROVISION_V_NO=options.PROVISION_V_NO || null;
        this.PAYMENT_V_NO=options.PAYMENT_V_NO || null;              
        this.SQL_STATE = options.SQL_STATE || (options.SQL_STATE === fixedValues.sqlState.sqlUnchange ? fixedValues.sqlState.sqlUnchange : fixedValues.sqlState.sqlInsert);    
    }

}


