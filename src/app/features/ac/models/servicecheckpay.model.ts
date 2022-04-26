
import { BaseEntity } from "src/app/core/models/base-entity";

export class Servicecheckpay extends BaseEntity {
    
    SERVICECHECKPAY_NO: number;
    SERVICECHECKPAY_ID: number;
    CHECK_NO: number;
    BILL_NO: number;
    LC_TYPE: string;
    LC_DATE: Date;
    IMPORT_NO: number;
    SUPPDOC_NO: number;
    SUPPINVOICE_NO: number;
    SUPPLIER_NO: number;
    COST_NO: number;
    PI_NO: number;
    V_NO: number;
    INVOICE_VALUE: number;
    ACCEPTANCE_VALUE: number;
    PAY_AMT: number;
    EXCHANGE_RATE: number;
    CUR_NO: number;
    BBLC_NO: number;
    DEDUCTION: number;
    AUDITED_VALUE: number;
    REF_NO: number;
    SUPPDOC_ID: string;
    SUPPINVOICE_ID: string;
    SUPPLIER_NAME: string;
    ITEM_TYPE: string;
    PENDING_VALUE_BASE: number;
    
                      
    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        super(options); 

        this.SERVICECHECKPAY_NO = options.SERVICECHECKPAY_NO || null;
        this.SERVICECHECKPAY_ID = options.SERVICECHECKPAY_ID || null;
        this.CHECK_NO = options.CHECK_NO || null;
        this.BILL_NO = options.BILL_NO || null;
        this.LC_TYPE = options.LC_TYPE || null;
        this.LC_DATE =  (options.LC_DATE) ? new Date(options.LC_DATE) : null;
        this.IMPORT_NO = options.IMPORT_NO || null;
        this.SUPPDOC_NO = options.SUPPDOC_NO || null;
        this.SUPPINVOICE_NO = options.SUPPINVOICE_NO || null;
        this.SUPPLIER_NO = options.SUPPLIER_NO || null;
        this.COST_NO = options.COST_NO || null;
        this.PI_NO = options.PI_NO || null;
        this.V_NO = options.V_NO || null;
        this.INVOICE_VALUE = options.INVOICE_VALUE || null;
        this.ACCEPTANCE_VALUE = options.ACCEPTANCE_VALUE || null;
        this.PAY_AMT = options.PAY_AMT || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.CUR_NO = options.CUR_NO || null;
        this.BBLC_NO = options.BBLC_NO || null;
        this.DEDUCTION = options.DEDUCTION || null;
        this.AUDITED_VALUE = options.AUDITED_VALUE || null;
        this.REF_NO = options.REF_NO || null;
        this.SUPPDOC_ID = options.SUPPDOC_ID || '';
        this.SUPPINVOICE_ID = options.SUPPINVOICE_ID || '';
        this.SUPPLIER_NAME = options.SUPPLIER_NAME || '';
        this.ITEM_TYPE = options.ITEM_TYPE || '';
        this.PENDING_VALUE_BASE = options.PENDING_VALUE_BASE || null;
            
        this._PK = "SERVICECHECKPAY_NO";
        this._ID = "SERVICECHECKPAY_ID";
    }

}
