
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class MoneyRequisitionDtl extends BaseEntity {

    MONEYREQ_NO : number;
    MONEYREQDTL_NO : number;
    PARTICULAR_NO: number;
    SUPPLIER_NO: number;
    WO_NO: number;
    MONEYREQ_QTY: number;
    RATE: number;
    TOTAL_AMT: number;
    PARTICULAR_ID: string;
    SUPPLIER: string;
    PARTICULAR: string;
    WO_ID: string;
    NOTE: string;
    // Use this field for validation in AC_1130
    IF_SUPPLIER_REQUIRED: any;
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute

        this.MONEYREQDTL_NO = options.MONEYREQDTL_NO || null;
        this.PARTICULAR_NO = options.PARTICULAR_NO || null;
        this.MONEYREQ_NO = options.MONEYREQ_NO || null;
        this.SUPPLIER_NO = options.SUPPLIER_NO || null;
        this.WO_NO = options.WO_NO || null;
        this.MONEYREQ_QTY = options.MONEYREQ_QTY || null;
        this.RATE = options.RATE || null;
        this.TOTAL_AMT = options.TOTAL_AMT || null;
        this.PARTICULAR_ID = options.PARTICULAR_ID || '';
        this.SUPPLIER = options.SUPPLIER || '';
        this.WO_ID = options.WO_ID || '';
        this.NOTE = options.NOTE || '';
        this.PARTICULAR = options.PARTICULAR || '';
        this.IF_SUPPLIER_REQUIRED = options.IF_SUPPLIER_REQUIRED || null;
        
        this._PK = "PARTICULAR_NO";
        this._ID = "PARTICULAR_ID";
    }
}
