
import { BaseEntity } from "src/app/core/models/base-entity";

export class Moneycheckpay extends BaseEntity {
    
    MONEYCHECKPAY_NO: number;
    MONEYCHECKPAY_ID: string;
    CHECK_NO: number;
    SCHEDULE_NO: number;
    SCHEDULE_ID: string;
    SUPPLIER_NO: number;
    SUPPLIER: string;
    COST_NO: number;
    COST_CENTER: string;
    PAY_AMT: number;
    MONEYREQ_ID: string;
    DUE_AMT: number;                      
    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        super(options);              
        this.MONEYCHECKPAY_NO = options.MONEYCHECKPAY_NO || null;
        this.MONEYCHECKPAY_ID = options.MONEYCHECKPAY_ID || '';
        this.CHECK_NO = options.CHECK_NO || null;
        this.SCHEDULE_NO = options.SCHEDULE_NO || null;
        this.SCHEDULE_ID = options.SCHEDULE_ID || '';
        this.SUPPLIER_NO = options.SUPPLIER_NO || null;
        this.SUPPLIER = options.SUPPLIER || '';
        this.COST_NO = options.COST_NO || null;
        this.COST_CENTER = options.COST_CENTER || '';
        this.PAY_AMT = options.PAY_AMT || null;
        this.MONEYREQ_ID = options.MONEYREQ_ID || '';
        this.DUE_AMT = options.DUE_AMT || null;        
        this._PK = "MONEYCHECKPAY_NO";
        this._ID = "MONEYCHECKPAY_ID";
    }

}
