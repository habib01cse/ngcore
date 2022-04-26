import { BaseEntity } from 'src/app/core/models/base-entity';
export class VoucherReportConfig extends BaseEntity {

    VOUCHER_REPORT_CONFIG_NO:number;
    VOUCHER_REPORT_CONFIG_ID:string;
    VTYPE_NO: number;
    SIGN_HEAD: string;
    SIGNTYPE_NO:number;
    SHOW_DIGITAL_SIGN:number;
    SERIAL:number;
    SHOW_NAME:number;
    SHOW_DATE:Date;
    SIGN_TYPE:string;

  
 

    constructor(options: any = {}) {
        super(options);
        this.VOUCHER_REPORT_CONFIG_NO = options.VOUCHER_REPORT_CONFIG_NO || null;
        this.VOUCHER_REPORT_CONFIG_ID = options.VOUCHER_REPORT_CONFIG_ID || "";
        this.VTYPE_NO = options.VTYPE_NO || null;      
        this.SIGN_HEAD = options.SIGN_HEAD || "";
        this.SIGNTYPE_NO = options.SIGNTYPE_NO || null;
        this.SHOW_DIGITAL_SIGN = options.SHOW_DIGITAL_SIGN || 0;
        this.SERIAL = options.SERIAL || null;
        this.SHOW_NAME = options.SHOW_NAME || 0;
        this.SHOW_DATE = options.SHOW_DATE || 0;
        this.SIGN_TYPE = options.SIGN_TYPE || "";
    }
}
