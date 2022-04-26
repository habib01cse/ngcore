import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class Increment extends BaseEntity {
    
    ACTUAL_INCR: number;
    ACTUAL_INCR_AMT: number;
    ACTUAL_INCR_ON: string;
    ACTUAL_INCR_PER: number;
    APPROVED_BY: number;
    APPROVED_EMP_NAME_ID: string;
    BASIC: number;
    BU_NAME: string;
    BU_NO: number;
    DTL_NAME: string;
    EMP_NO: number;
    GRADE: string;
    INCREMENT_DATE: Date;
    INCREMENT_ELEMENT1: string;
    INCREMENT_NO: number;
    INCREMENT_RULE_AMT: number;
    INCREMENT_RULE_PER: number;
    INCREMENT_TYPE: number;
    INCR_ON: string;
    JOBTITLE: string;
    JOBTITLE_NO: number;
    NEW_BASIC: number;
    NEW_GROSS: number;
    NEXT_INCREMENT_DATE: Date;
    OLD_BASIC: number;
    OLD_GROSS: number;
    REMARKS: string;
    SCALE_NO: number;
    SPECIAL_BASIC: number;
    STEP_NO: number;
    INCREMENT_ACTUAL: number;



    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// Increment class attribute
        
        this.ACTUAL_INCR = options.ACTUAL_INCR || null;
        this.ACTUAL_INCR_AMT = options.ACTUAL_INCR_AMT || null;
        this.ACTUAL_INCR_ON = options.ACTUAL_INCR_ON || '';
        this.ACTUAL_INCR_PER = options.ACTUAL_INCR_PER || null;
        this.APPROVED_BY = options.APPROVED_BY || null;
        this.APPROVED_EMP_NAME_ID = options.APPROVED_EMP_NAME_ID || '';
        this.BASIC = options.BASIC || null;
        this.BU_NAME = options.BU_NAME || '';
        this.BU_NO = options.BU_NO || null;
        this.DTL_NAME = options.DTL_NAME || '';
        this.EMP_NO = options.EMP_NO || null;
        this.GRADE = options.GRADE || '';
        this.INCREMENT_DATE = options.INCREMENT_DATE ? new Date(options.INCREMENT_DATE) : null;
        this.INCREMENT_ELEMENT1 = options.INCREMENT_ELEMENT1 || '';
        this.INCREMENT_NO = options.INCREMENT_NO || null;
        this.INCREMENT_RULE_AMT = options.INCREMENT_RULE_AMT || null;
        this.INCREMENT_RULE_PER = options.INCREMENT_RULE_PER || null;
        this.INCREMENT_TYPE = options.INCREMENT_TYPE || null;
        this.INCR_ON = options.INCR_ON || '';
        this.JOBTITLE = options.JOBTITLE || '';
        this.JOBTITLE_NO = options.JOBTITLE_NO || null;
        this.NEW_BASIC = options.NEW_BASIC || null;
        this.NEW_GROSS = options.NEW_GROSS || null;
        this.NEXT_INCREMENT_DATE = options.NEXT_INCREMENT_DATE ? new Date(options.NEXT_INCREMENT_DATE) : null;
        this.OLD_BASIC = options.OLD_BASIC || null;
        this.OLD_GROSS = options.OLD_GROSS || null;
        this.REMARKS = options.REMARKS || '';
        this.SCALE_NO = options.SCALE_NO || null;
        this.SPECIAL_BASIC = options.SPECIAL_BASIC || null;
        this.STEP_NO = options.STEP_NO || null;
        this.INCREMENT_ACTUAL = options.INCREMENT_ACTUAL || null;


    }
}

