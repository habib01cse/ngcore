import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class FundDistribution extends BaseEntity{
    AMOUNT: number;
    FUND_DISTRIBUTION_NO: number;
    PI_NO: number;
    REALPIDIST_NO: number;
    SI_NO: number;
    PI_ID: string;
    AMOUNT_BASE: number;


    constructor(options: any = {}) {
        super();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        
        this.AMOUNT = options.AMOUNT || null;
        this.FUND_DISTRIBUTION_NO = options.FUND_DISTRIBUTION_NO || null;
        this.PI_NO = options.PI_NO || null;
        this.REALPIDIST_NO = options.REALPIDIST_NO || null;
        this.SI_NO = options.SI_NO || null;
        this.PI_ID = options.PI_ID || '';
        this.AMOUNT_BASE = options.AMOUNT_BASE || null;
    
    }
}
