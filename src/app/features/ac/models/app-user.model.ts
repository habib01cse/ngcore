import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class AppUser extends BaseEntity {

 
    APPUSER_NO: number;
    APPSETDTL_NO : number;
    USER_NO : number;
    JOBTITLE:string;
    BU_NAME:string;
    DEPARTMENT:string;
    
    EMP_NAME_ID:string;
    INT_EMP_NAME:string;
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.APPUSER_NO = options.APPUSER_NO  || null;
        this.APPSETDTL_NO  = options.APPSETDTL_NO   || null;
        this.USER_NO = options.USER_NO  || null;
        this.BU_NAME = options.BU_NAME || '';     
        this.JOBTITLE = options.JOBTITLE || '';
        this.DEPARTMENT = options.DEPARTMENT || '';
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.INT_EMP_NAME = options.INT_EMP_NAME || '';
        
        this._PK = "APPUSER_NO";
        this._ID = "";
    }
}
