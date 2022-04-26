
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CompanyName } from './company-name.model';

export class CostCompany extends BaseEntity {
    ACC_COST_NO: number;
    ACC_COST_ID: string;    
    ACTIVE_STAT: number;
    COMPANY_ID: string;
    COMPANY_NAME: string;
    COMPANY_NO: number;
    COST_NO: number;
    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.ACC_COST_NO = options.ACC_COST_NO || null;
        this.ACC_COST_ID = options.ACC_COST_ID || '';
        this.ACTIVE_STAT = options.ACTIVE_STAT || 0;
        this.COMPANY_ID = options.COMPANY_ID || '';
        this.COMPANY_NAME = options.COMPANY_NAME || null;
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.COST_NO = options.COST_NO || null;

        this._PK = "ACC_COST_NO";
        this._ID = "ACC_COST_ID";
    }
}
