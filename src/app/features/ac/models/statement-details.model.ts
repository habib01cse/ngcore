import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Model of AC_1011 Financial Statement Details
 */

export class StatementDetails extends BaseEntity {
   
    ALIAS: string;
    NATURE_NAME: string;
    STRTYPE_NAME: string;
    FORMULA: number;
    MSTR_SETUP_NO: number;
    NATURE_NO: number;
    SETUP_NO: number;
    SHOW_IN: number;
    SL_NO: number;    
    STOCK_OS_CS: number;
    STRTYPE_NO: number;
    SQL_STATE: number;

    constructor(options: any = {}) {
        super(options);
        this.ALIAS = options.ALIAS || '';
        this.NATURE_NAME = options.NATURE_NAME || '';
        this.STRTYPE_NAME = options.STRTYPE_NAME || '';
        this.FORMULA = options.FORMULA || null;
        this.MSTR_SETUP_NO = options.MSTR_SETUP_NO || null;
        this.NATURE_NO = options.NATURE_NO || null;
        this.SETUP_NO = options.SETUP_NO || null;
        this.SHOW_IN = options.SHOW_IN || null;
        this.SL_NO = options.SL_NO || null 
        this.STOCK_OS_CS = options.STOCK_OS_CS || null;
        this.STRTYPE_NO = options.STRTYPE_NO || null;
        this.SQL_STATE = options.SQL_STATE || (options.SQL_STATE === fixedValues.sqlState.sqlUnchange ? fixedValues.sqlState.sqlUnchange : fixedValues.sqlState.sqlInsert);    
    }
}

