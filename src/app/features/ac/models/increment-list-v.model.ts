import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


export class IncrementListV extends BaseEntity {
    
    ACTIVE_STAT: number;
    BU_NAME: string;
    BU_NO: number;
    BU_NO_ALL: number;
    CNT_INCR: number;  
    CURRENT_BASIC: number;
    CURRENT_GROSS: number;
    EMP_ID: string;
    EMP_NAME_ID: string;
    EMP_NO: number;
    EMP_TYPE: number;
    EMP_TYPE_NAME: string;
    GRADE: string;
    GRADE_NO: number;
    HR_TYPE: string;
    HR_TYPE_NO: number;
    INCREMENT_DATE: Date;
    INC_AMT: number;
    INC_RATE: number;
    INTERVAL_MONTH: number;
    JOBTITLE: string;
    JOBTITLE_DATE: Date;
    JOBTITLE_NO: number;
    JOB_TYPE: string;
    JOB_TYPE_NO: number;
    JOIN_DATE: Date;
    LAST_INCR_AMT: number;
    LAST_INCR_DATE: Date;
    MAX_LIMIT: number;
    NEXT_INCR_DATE: Date;
    ORGIN_EMP_ID: string;
    SAL_REPORT_SL_NO: number;
    SCALE_NO: number;
 

    JOIN_DAYS: number; 
    JOBTITLE_DAYS: number;
    LAST_INCREMENT_DAYS: number;




    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        
        this.ACTIVE_STAT = options.ACTIVE_STAT || null;
        this.BU_NAME = options.BU_NAME || '';
        this.BU_NO = options.BU_NO || null;
        this.BU_NO_ALL = options.BU_NO_ALL || null;
        this.CNT_INCR = options.CNT_INCR || null;  
        this.CURRENT_BASIC = options.CURRENT_BASIC || null;
        this.CURRENT_GROSS = options.CURRENT_GROSS || null;
        this.EMP_ID = options.EMP_ID || '';
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.EMP_NO = options.EMP_NO || null;
        this.EMP_TYPE = options.EMP_TYPE || null;
        this.EMP_TYPE_NAME = options.EMP_TYPE_NAME || '';
        this.GRADE = options.GRADE || '';
        this.GRADE_NO = options.GRADE_NO || null;
        this.HR_TYPE = options.HR_TYPE || '';
        this.HR_TYPE_NO = options.HR_TYPE_NO || null;
        this.INCREMENT_DATE = options.INCREMENT_DATE ? new Date(options.INCREMENT_DATE) : null;
        this.INC_AMT = options.INC_AMT || null;
        this.INC_RATE = options.INC_RATE || null;
        this.INTERVAL_MONTH = options.INTERVAL_MONTH || null;
        this.JOBTITLE = options.JOBTITLE || '';
        this.JOBTITLE_DATE = options.JOBTITLE_DATE ? new Date(options.JOBTITLE_DATE) : null;
        this.JOBTITLE_NO = options.JOBTITLE_NO || null;
        this.JOBTITLE_NO = options.JOBTITLE_NO || '';
        this.JOB_TYPE_NO = options.JOB_TYPE_NO || null;
        this.JOIN_DATE = options.JOIN_DATE ? new Date(options.JOIN_DATE) : null;
        this.LAST_INCR_AMT = options.LAST_INCR_AMT || null;
        this.LAST_INCR_DATE = options.LAST_INCR_DATE ? new Date(options.LAST_INCR_DATE) : null;
        this.MAX_LIMIT = options.MAX_LIMIT || null;
        this.NEXT_INCR_DATE = options.NEXT_INCR_DATE ? new Date(options.NEXT_INCR_DATE) : null;
        this.ORGIN_EMP_ID = options.ORGIN_EMP_ID || '';
        this.SAL_REPORT_SL_NO = options.SAL_REPORT_SL_NO || null;
        this.SCALE_NO = options.SCALE_NO || null;
        


        this.JOIN_DAYS = options.JOIN_DAYS || null;
        this.JOBTITLE_DAYS = options.JOBTITLE_DAYS || null;
        this.LAST_INCREMENT_DAYS = options.LAST_INCREMENT_DAYS || null;
        
    }
}

