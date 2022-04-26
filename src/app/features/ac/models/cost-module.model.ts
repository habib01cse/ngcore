
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CompanyName } from './company-name.model';

export class CostModule extends BaseEntity {
    PK_NO: number;
    PK_ID: string;        
    COMPANY_NO: number;
    COST_NO: number;
    MODULE: number;

    _PK: string;
    _ID: string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.PK_NO = options.PK_NO || null;
        this.PK_ID = options.PK_ID || '';
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.COST_NO = options.COST_NO || null;
        this.MODULE = options.MODULE || '';
       
        this._PK = "PK_NO";
        this._ID = "PK_NO";
    }
}
