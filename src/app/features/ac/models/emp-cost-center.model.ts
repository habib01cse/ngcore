
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class EmpCostCenter extends BaseEntity {

    EMP_ID: number;
    EMP_COST_NO: number;
    EMP_NAME: string;
    JOBTITLE: string;
    BU_NAME: string;
    COMPANY_NAME: string;
    COST_NO_PARENT: number;
    EMP_NO: number;
    COST_NAME: string;
    DESCR: string;
    INACTIVE_STAT: number;
    OPER_NO: number;
    PP_FLAG: number;
    RECURRING_FLAG: number;
    PP_DATE: number;
    COST_SALESCONTRACT_NO: number;
    COMPANY_NO: number;
    ACC_NO: number;
    COST_NO: number;
    // SS_MODIFIER : number;
    // SS_CREATOR : number;
    // COMPANY_NO : number;
    SQL_STATE: number;
    _PK: string;
    _ID: string;




    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.EMP_ID = options.EMP_ID || null;
        this.EMP_COST_NO = options.EMP_COST_NO || null;
        this.EMP_NAME = options.EMP_NAME || null;
        this.JOBTITLE = options.JOBTITLE || null;
        this.BU_NAME = options.BU_NAME || null;
        this.COMPANY_NAME = options.COMPANY_NAME || null;
        this.COST_NAME = options.COST_NAME || null;
        this.DESCR = options.DESCR || null;
        this.COST_NO_PARENT = options.COST_NO_PARENT || 0;
        this.EMP_NO = options.EMP_NO || 0;
        this.INACTIVE_STAT = options.INACTIVE_STAT || 0;
        this.OPER_NO = options.OPER_NO || 0;
        this.RECURRING_FLAG = options.RECURRING_FLAG || 0;
        this.PP_DATE = options.PP_DATE || 0;
        this.COST_SALESCONTRACT_NO = options.COST_SALESCONTRACT_NO || 0;
        this.COMPANY_NO = options.COMPANY_NO || 0;
        this.ACC_NO = options.ACC_NO || 0;
        this.COST_NO = options.COST_NO || 0;
        this._PK = "EMP_COST_NO";
        this._ID = "EMP_COST_ID";

    }
    
}
