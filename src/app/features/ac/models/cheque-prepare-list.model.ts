import { BaseEntity } from 'src/app/core/models/base-entity';
import { NumericPipeRendererComponent } from 'src/app/shared/components/numeric-pipe-renderer.component';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequPrepareList extends BaseEntity {
    DR_CR: string;
    DR: number;
    CR: number;
    BA_NO: number;
    CHECK_NO: number; 
    BA_NAME: string;
    CHECK_AMT: number;
    PAY_TO_NAME: string;
    ACC_NO: number;
    ACC_NAME: string;
    ACC_PATH: string;
    PAY_TO_ACC_NO: number;
    COST_NO: number;
    BASE_AMOUNT_DR: number;
    BASE_AMOUNT_CR: number;
    COST_NAME: string;
    DESCR: string;
    REGISTER_NO: number;
    REGISTER_ID: string;

    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        super(options);
        this.BA_NO = options.BA_NO || null;
        this.DR_CR = options.DR_CR || '';  
        this.DR = options.DR || (options.DR === 0 ? 0 : null);   
        this.CR = options.CR || (options.CR === 0 ? 0 : null);    
        this.CHECK_NO = options.CHECK_NO || null;
        this.BA_NAME = options.BA_NAME || '';
        this.CHECK_AMT = options.CHECK_AMT || null;
        this.ACC_NO = options.ACC_NO || null;
        this.PAY_TO_NAME = options.PAY_TO_NAME || '';
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_PATH = options.ACC_PATH || '';
        this.PAY_TO_ACC_NO = options.PAY_TO_ACC_NO || null;
        this.COST_NO = options.COST_NO || null;
        this.BASE_AMOUNT_DR = options.BASE_AMOUNT_DR || (options.BASE_AMOUNT_DR === 0 ? 0 : null);
        this.BASE_AMOUNT_CR = options.BASE_AMOUNT_CR || (options.BASE_AMOUNT_CR === 0 ? 0 : null);
        this.COST_NAME = options.COST_NAME || '';
        this.DESCR = options.DESCR || '';
        this.REGISTER_NO = options.REGISTER_NO || null;
        this.REGISTER_ID = options.REGISTER_ID || null;
        
        //this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this._PK = "REGISTER_NO";
        this._ID = "REGISTER_ID";

    }
}

