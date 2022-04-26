
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CompanyName } from './company-name.model';

export class CostCenter extends BaseEntity {

    COST_NO: number;
    COST_ID: string;
    REF_NO: number;
    REF_NAME: string;
    DESCR: string;
    REF_NO_PARENT: number;
    PARENT_BUSINESS_UNIT: string;
    REF_PI_NO: number;
    SI_ID: string;
    PI_ID: string;
    REF_INVOICE_NO: number;
    INACTIVE_STAT: number;

    SQL_STATE: number;
    RefCompanyList: CompanyName[];
    
    //Use for AC_1013
    ACC_NAME: string;
    ACC_NO: number;
    COST_CHK: number;
    COST_NAME: string;
    COST_NO_PARENT: number;
    COST_SALESCONTRACT_NO: number;
    OPER_NO: number;
    PARENT_COST_NAME: string;
    PP_DATE: Date;
    PP_FLAG: number;
    RECURRING_FLAG: number;
    ACC_CODE_NAME: string;

   

    _PK: string;
    _ID: string;

    
    


    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.COST_NO = options.COST_NO || null;
        this.COST_ID  = options.COST_ID || '';
        this.REF_NO = options.REF_NO || 0;
        this.REF_NAME = options.REF_NAME || null;
        this.DESCR = options.DESCR || null;
        this.REF_NO_PARENT = options.REF_NO_PARENT || 0;
        this.PI_ID = options.PI_ID || null;
        this.PARENT_BUSINESS_UNIT = options.PARENT_BUSINESS_UNIT || null;
        this.SI_ID = options.SI_ID || null;
        this.REF_PI_NO = options.REF_PI_NO || 0;
        this.REF_INVOICE_NO = options.REF_INVOICE_NO || 0;
        this.INACTIVE_STAT = options.INACTIVE_STAT || 0;
        this.RefCompanyList = (options.RefCompanyList) ? options.RefCompanyList : new Array<CompanyName>();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        //Use for AC_1013
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_NO = options.ACC_NO || null;
        this.COST_CHK = options.COST_CHK == 1 ? 1 : 0;
        this.COST_NAME = options.COST_NAME || '';
        this.COST_NO_PARENT = options.COST_NO_PARENT || null;
        this.COST_SALESCONTRACT_NO = options.COST_SALESCONTRACT_NO || null;
        this.OPER_NO = options.OPER_NO || null;
        this.PARENT_COST_NAME = options.PARENT_COST_NAME || '';
        this.PP_DATE = options.PP_DATE ? new Date(options.PP_DATE) : null; 
        this.PP_FLAG = options.PP_FLAG == 1 ? 1 : 0;
        this.RECURRING_FLAG = options.RECURRING_FLAG == 1 ? 1 : 0;
        this.ACC_CODE_NAME = options.ACC_CODE_NAME || '';

        this._PK = "COST_NO";
        this._ID = "COST_ID";
    }
}
