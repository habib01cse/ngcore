import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Model of AC_1011 Financial Statement Head 
 */

export class FinancialStatementHead extends BaseEntity {
    SL_NO:string
    ALIAS:string
    PERIOD_NAME:string;
    FORMULA:string;
    HEADING:string;
    MSTR_SETUP_NO:number;
    SHOW_IN:string;    
    SQL_STATE: number;

    constructor(options: any = {}) {
        super(options);
        this.SL_NO = options.SL_NO || null;
        this.ALIAS = options.ALIAS || '';
        this.FORMULA = options.FORMULA || '';
        this.HEADING = options.HEADING || '';
        this.MSTR_SETUP_NO = options.MSTR_SETUP_NO || null;
        this.SHOW_IN = options.SHOW_IN || null;        
        this.SQL_STATE = options.SQL_STATE || (options.SQL_STATE === fixedValues.sqlState.sqlUnchange ? fixedValues.sqlState.sqlUnchange : fixedValues.sqlState.sqlInsert);    
    }
}

