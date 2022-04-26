import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class Appset extends BaseEntity {

 
    APPSET_NO: number;
    BU_NO : number;    
    SUBMENU_ID : string;    
    START_STATUS_NO:number;
    ORDER_SL : number;
    LAST_STATUS_NO:number;
    APP_PROCESSTYPE_NO:number;
    USER_PERMISSION_TYPE:number;
    PAYMENT_MODE : string;
    MODULE_NO:number;
    ISSUE_TYPE:number;

    VAL_RANGE_FROM:number;
    VAL_RANGE_TO:number;
    EFFECT_DATE : Date;

    COMPANY_NAME : string;
    COMPANY_NO : number;
    BU_NAME : string;
    SUBMENU_NAME_USER : string;
    APPROVAL_TYPE:string;
   
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.APPSET_NO = options.APPSET_NO  || null;
        this.BU_NO  = options.BU_NO   || null;
        this.SUBMENU_ID = options.SUBMENU_ID || '';
        this.ORDER_SL = options.ORDER_SL  || null;
        this.START_STATUS_NO = options.START_STATUS_NO  || null;
        this.LAST_STATUS_NO = options.LAST_STATUS_NO  || null;
        this.APP_PROCESSTYPE_NO = options.APP_PROCESSTYPE_NO  || null;
        this.USER_PERMISSION_TYPE = options.USER_PERMISSION_TYPE  || null;
        this.PAYMENT_MODE = options.PAYMENT_MODE  || '';
        this.MODULE_NO = options.MODULE_NO  || null;
        this.ISSUE_TYPE = options.ISSUE_TYPE  || null;
        this.VAL_RANGE_FROM = options.VAL_RANGE_FROM  || null;
        this.VAL_RANGE_TO = options.VAL_RANGE_TO  || null;
        this.EFFECT_DATE = options.EFFECT_DATE ? new Date(options.EFFECT_DATE) : null;
        this.BU_NAME = options.BU_NAME  || '';
        this.APPROVAL_TYPE = options.APPROVAL_TYPE  || '';
        this.COMPANY_NO = options.COMPANY_NO  || null;
        this.COMPANY_NAME = options.COMPANY_NAME  || '';
        this.SUBMENU_NAME_USER = options.SUBMENU_NAME_USER  || '';
        
        this._PK = "APPSET_NO";
        this._ID = "";
    }
}
