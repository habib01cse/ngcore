import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequeType extends BaseEntity {
    STATUS: string;
    CHECK_STAT_NO: number;
    constructor(options: any = {}) {
        super(options);
        // this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        this.STATUS = options.STATUS || '';
        this.CHECK_STAT_NO = options.CHECK_STAT_NO || null;

    }
}

