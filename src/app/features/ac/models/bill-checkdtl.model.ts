
import { BaseEntity } from "src/app/core/models/base-entity";

export class BillCheckdtl extends BaseEntity {       

    BILL_CKECKDTL_NO :  any;
    BILL_CKECKDTL_ID :  any;
    CHECK_NO : any;
    BILL_NO : any;
    BILL_ID : any;
    WO_ID : any;
    LC_TYPE : any;
    LC_DATE : any;
    IMPORT_NO : any;
    SUPPINVOICE_NO : any;
    PI_NO : any;
    INVOICE_VALUE : any;
    ACCEPTANCE_VALUE : any;
    PAY_AMT : any;
    EXCHANGE_RATE : any;
    CUR_NO : any;
    REF_NO : any;
    SS_OG_NO : any;
    COMPANY_NO : any;
    SUPPLIER_NO : any;
    SUPPLIER_NAME : any;
    COST_NO : any;
    COST_NAME : any;
    BBLC_NO : any;
    DEDUCTION : any;
    AUDITED_VALUE : any;
    DUE_AMT : any;
    DUE_PAYMENT : any;
    PENDING_VALUE : any;
    DOC_NO : string;
    TOTAL_PAY: number;
    ADVANCE_PAY_AMT: number;
        
    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        super(options);  
        this.BILL_CKECKDTL_NO = options.BILL_CKECKDTL_NO || null; 
        this.BILL_CKECKDTL_ID = options.BILL_CKECKDTL_ID || '';
        this.CHECK_NO = options.CHECK_NO || null;
        this.BILL_NO = options.BILL_NO || null;
        this.BILL_ID = options.BILL_ID || '';
        this.WO_ID = options.WO_ID || '';
        this.LC_TYPE = options.LC_TYPE || '';
        this.LC_DATE = (options.LC_DATE) ? new Date(options.LC_DATE) : null;
        this.IMPORT_NO = options.IMPORT_NO || null;
        this.SUPPINVOICE_NO = options.SUPPINVOICE_NO || null;
        this.PI_NO = options.PI_NO || null;
        this.INVOICE_VALUE = options.INVOICE_VALUE || null;
        this.ACCEPTANCE_VALUE = options.ACCEPTANCE_VALUE || null;
        this.PAY_AMT = options.PAY_AMT || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.CUR_NO = options.CUR_NO || null;
        this.REF_NO = options.REF_NO || null;        
        this.SUPPLIER_NO = options.SUPPLIER_NO || null;
        this.SUPPLIER_NAME = options.SUPPLIER_NAME || '';
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || '';
        this.BBLC_NO = options.BBLC_NO || null;
        this.DEDUCTION = options.DEDUCTION || '';
        this.AUDITED_VALUE = options.AUDITED_VALUE || null;
        this.DUE_AMT = options.DUE_AMT || null;
        this.DUE_PAYMENT = options.DUE_PAYMENT || null;
        this.PENDING_VALUE = options.PENDING_VALUE || null;
        this.DOC_NO = options.DOC_NO || null;
        this.TOTAL_PAY = options.TOTAL_PAY || 0;
        this.ADVANCE_PAY_AMT = options.ADVANCE_PAY_AMT || 0;
        
                
        this._PK = "BILL_CKECKDTL_NO";
        this._ID = "BILL_CKECKDTL_ID";
    }

}
