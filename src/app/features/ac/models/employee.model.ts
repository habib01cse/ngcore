import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class Employee extends BaseEntity {
    EMP_NO: number;
    EMP_NAME: string;
    EMP_NAME_ID: string;
    VTYPE_NO: number;
    LIST_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// OtherBill class attribute
        this.EMP_NO = options.EMP_NO || null;
        this.LIST_NO = options.LIST_NO || null;
        this.EMP_NAME = options.EMP_NAME || '';
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.VTYPE_NO = options.VTYPE_NO || null;

    }
}

