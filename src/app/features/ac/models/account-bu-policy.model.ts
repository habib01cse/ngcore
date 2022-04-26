import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class AccountBuPolicy extends BaseEntity {
    BU_ACC_NO:number;
    EMP_NAME_ID: string;
    SECURITY_ACTIVE: number;
    SQL_STATE:number;
    USER_NO:number; 
    
    // ACC_CODE: string;
    // EMP_NO: number;
    // EMP_NAME: string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// OtherBill class attribute
        this.BU_ACC_NO = options.BU_ACC_NO || null;
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.SECURITY_ACTIVE = options.SECURITY_ACTIVE || 0;
        this.USER_NO = options.USER_NO || null; 
    }
}

