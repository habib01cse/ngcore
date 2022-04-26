import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
/**
 * Model of AC_1011 Accounts Category
 */

export class Statement extends BaseEntity {
    MSTR_SETUP_NO:string;
    SL_NO:string;
    HEADING:string;
    ALIAS:string;
    FORMULA:string;
    SHOW_IN:string;
    SQL_STATE:number;
    statmentSetupList:any[];

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super();

        this.MSTR_SETUP_NO = options.MSTR_SETUP_NO || null;
        this.SL_NO = options.SL_NO || null;
        this.HEADING = options.HEADING || null;
        this.ALIAS = options.ALIAS || null;
        this.FORMULA = options.FORMULA || null;
        this.SHOW_IN = options.SHOW_IN || null;
        this.statmentSetupList = options.statmentSetupList || new Array();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
    }
}
