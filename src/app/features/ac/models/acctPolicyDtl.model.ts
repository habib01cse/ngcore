import { BaseEntity } from 'src/app/core/models/base-entity';


export class AcctPolicyDtl extends BaseEntity {

    BU_ACC_DTL_NO:number;
    BU_ACC_NO:number;
    BU_NO: number;
    BU_NAME_ORG: string; 
    
    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// OtherBill class attribute
        this.BU_ACC_DTL_NO = options.BU_ACC_DTL_NO || null;
        this.BU_ACC_NO = options.BU_ACC_NO || null;
        this.BU_NO = options.BU_NO || null;
        this.BU_NAME_ORG = options.BU_NAME_ORG || '';
    }
}

