import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
/**
 * Model of AC_1012 Accounts Category
 */

export class CompanyName extends BaseEntity {
    COMPANY_NO: number;
    SQL_STATE: number;

    constructor(options: any = {}) {
        super();

        this.COMPANY_NO = options.COMPANY_NO || 0;
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
    }
}
