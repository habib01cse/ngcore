import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class AppsetDtl extends BaseEntity {

 
    APPSET_NO: number;
    APPSETDTL_NO:number; 
    TASK_NAME : string;  
    STATUS_NO : number;
    NEXT_STATUS_NO:number; 
    SCHEDULE_FLAG : number;
    REVISE_STATUS_NO:number;
    CAN_EDIT_UPTO_STATUS:number;
    CAN_OPEN_LC_AFTER_STATUS:number;
    SIGNATURE_TYPE_NO : number;
    IF_DIGITAL_SIGNATURE:number;
    IF_INITIATOR_DEPT_APP:number;
    TASK_TYPE : string;
    SIGNATURE_HEAD : string;
    DEVHEAD_CHANGE_FLAG : number;
    DEV_CHANGE_FLAG : number;
    QC_CHANGE_FLAG : number;
    SIGNATURE_SERIAL : number;
    COMPANY_NAME : string;
    BU_NAME : string;
    PRIV_NAME : string;
   
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.APPSET_NO = options.APPSET_NO  || null;
        this.APPSETDTL_NO  = options.APPSETDTL_NO   || null;
        this.TASK_NAME = options.TASK_NAME || '';
        this.STATUS_NO = options.STATUS_NO  || 0;
        this.NEXT_STATUS_NO = options.NEXT_STATUS_NO  || 0;
     //   this.SCHEDULE_FLAG = options.SCHEDULE_FLAG  || 0;
        this.REVISE_STATUS_NO = options.REVISE_STATUS_NO  || null;
        this.CAN_EDIT_UPTO_STATUS = options.CAN_EDIT_UPTO_STATUS  || null;
        this.CAN_OPEN_LC_AFTER_STATUS = options.CAN_OPEN_LC_AFTER_STATUS  || '';
        this.SIGNATURE_TYPE_NO = options.SIGNATURE_TYPE_NO  || null;
        this.IF_DIGITAL_SIGNATURE = options.IF_DIGITAL_SIGNATURE  || null;
        this.IF_INITIATOR_DEPT_APP = options.IF_INITIATOR_DEPT_APP  || null;
        this.TASK_TYPE = options.TASK_TYPE  || null;
       // this.EFFECT_DATE = options.EFFECT_DATE ? new Date(options.EFFECT_DATE) : null;
        this.SIGNATURE_HEAD = options.SIGNATURE_HEAD  || '';
        this.DEVHEAD_CHANGE_FLAG = options.DEVHEAD_CHANGE_FLAG || null;
        this.DEV_CHANGE_FLAG = options.DEV_CHANGE_FLAG || null;
        this.QC_CHANGE_FLAG = options.QC_CHANGE_FLAG || null;
        this.SIGNATURE_SERIAL = options.SIGNATURE_SERIAL || null;
        this.COMPANY_NAME = options.COMPANY_NAME  || '';
        this.BU_NAME = options.BU_NAME  || '';
        this.PRIV_NAME = options.PRIV_NAME  || '';
        this.SCHEDULE_FLAG = options.SCHEDULE_FLAG ==1? 1:0;
        this._PK = "APPSETDTL_NO";
        this._ID = "";
    }
}
