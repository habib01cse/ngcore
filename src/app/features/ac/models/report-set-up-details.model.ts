import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ReportSetUpDetails extends BaseEntity {

    RPDTL_NO: number;
    ACC_NO: number;
    ACC_NAME: string;
    COST_NO: number;
    COST_NAME: string;
    BA_NO: number;
    BA_NAME: string;
    RP_ALIAS: string;
    FORMULA: string;
    RP_SHOW_FLAG: number;
    SL_NO: number; 

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// RepSetUp class attribute
        this.RPDTL_NO = options.RPDTL_NO || null;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || '';
        this.BA_NO = options.BA_NO || null;
        this.BA_NAME = options.BA_NAME || '';
        this.RP_ALIAS = options.RP_ALIAS || '';
        this.FORMULA = options.FORMULA || '';
        this.RP_SHOW_FLAG = options.RP_SHOW_FLAG || 0;
        this.SL_NO = options.SL_NO || null;
    }
}

