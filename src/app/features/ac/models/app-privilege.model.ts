import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class Appprivilege extends BaseEntity {

 
    APPPRIVILEGE_NO: number;
    APPSETDTL_NO : number;
    REMARKS : string; 
    PRIVILEGE_NO : number;
    PRIV_NO : number;
    

    PRIV_NAME:string;
    
   
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.APPPRIVILEGE_NO = options.APPPRIVILEGE_NO  || null;
        this.APPSETDTL_NO  = options.APPSETDTL_NO   || null;
        this.REMARKS = options.REMARKS || '';
        this.PRIVILEGE_NO = options.PRIVILEGE_NO  || null;
        this.PRIV_NAME = options.PRIV_NAME || '';
        this.PRIV_NO = options.PRIV_NO  || null;
        
        this._PK = "APPPRIVILEGE_NO";
        this._ID = "";
    }
}
