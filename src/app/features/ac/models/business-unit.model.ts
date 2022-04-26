import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class BusinessUnit extends BaseEntity {
    BU_NO: number;
    BU_NAME: string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this.BU_NO = options.BU_NO || null;
        this.BU_NAME = options.BU_NAME || null;

    }
}

