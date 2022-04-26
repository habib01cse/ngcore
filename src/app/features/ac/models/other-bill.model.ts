import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class OtherBill extends BaseEntity {
    PROACC_NO:number;
    ACC_NO: number;
    ACC_NAME: string;
    ACC_CODE: string;
    EMP_NO: number;
    EMP_NAME: string;
    BILLTYPEDTL_NO:number;
    BILL_TYPE: string;
    BILLACC_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// OtherBill class attribute
        this.PROACC_NO = options.PROACC_NO || null;
        this.BILLACC_NO = options.BILLACC_NO || null;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_CODE = options.ACC_CODE || '';
        this.EMP_NO = options.EMP_NO || null;
        this.EMP_NAME = options.EMP_NAME || '';
        this.BILL_TYPE = options.BILL_TYPE || '';
        this.BILLTYPEDTL_NO = options.BILLTYPEDTL_NO || null;
    }
}

