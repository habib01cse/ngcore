import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { BaseEntity } from 'src/app/core/models/base-entity';

export class AccountsBalanceDisplay extends BaseEntity {
    NATURE_NO: number;
    NATURE_NAME: string;
    ACC_NO: number;
    ACC_ID: string;
    ACC_NAME: string;
    ACC_CODE: string;
    ACC_PATH: string;    

    //
    BU_NAME: any
    BA_NO: any
    ACTIVE: any;
    BALANCE: any
    BU_NO:any

    _PK: string;
    _ID: string;



    constructor(options: any = {}) {
        super(options);        
        this.NATURE_NO = options.NATURE_NO || null;
        this.NATURE_NAME = options.NATURE_NAME || '';
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_CODE = options.ACC_CODE || '';
        this.ACC_PATH = options.ACC_PATH || '';
        this.BU_NAME=options.BU_NAME  || null ;
        this.BA_NO=options.BA_NO || null ;
        this.ACTIVE=options.ACTIVE == 0 ? 0 : options.ACTIVE ? options.ACTIVE : null ;
        this.BALANCE=options.BALANCE || null ;
        this.BU_NO=options.BU_NO || null;

        this._PK = "ACC_NO";
        this._ID = "ACC_ID";
    }
}
