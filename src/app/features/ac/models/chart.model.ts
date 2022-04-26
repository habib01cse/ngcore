import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

 /**
 * Model of AC_1001 Chart of Accounts
 */


 export class Chart extends BaseEntity {
    NATURE_NO: number;
    NATURE_CODE:string;
    NATURE_NAME:string;
    ACC_CODE: string;
    ACC_NAME: string;
    OLD_ACC_CODE: string;
    DESCR: string;
    PARENT_NAME: string;
    PARENT_ACC_NO: number;
    ACTIVE: any;
    ORDER_SL: any;
    DEFAULT_CUR_NO: number;
    COST_FLG: any;
    RECURRING_FLAG: any;
    SUMMARY_REPORT_LVL: string;
    COST_SEL_TYPE: string;
    chartCostList: any[];
    BA_FLG: number;
    REF_ACC_NO: number;
    MAP_ACC: string;
    BA_SEL_TYPE: string;
    chartBaList: any[];
    BU_NO: number;
    BU_NAME: string;
    CNT:any;
    ALLOCATION_ACTIVE: any;
    COMPANY_NO: number;
    COST_NO: number;
    COST_NAME: string;
    BA_NO: number;
    BA_NAME: string;
    ALLOCATION_PER: number;
    SQL_STATE:number;

    ACC_NO: any;
    LVL: any;
    POST_FLG: any;
    companyList:any[];
    costCenterList:any[];
    costAllocationList:any[];


    constructor(options: any = {}) {
        super();

        /// Chart class attribute
        this.NATURE_NO = options.NATURE_NO || null;
        this.NATURE_CODE = options.NATURE_CODE || null;
        this.NATURE_NAME = options.NATURE_NAME || null;
        this.ACC_CODE = options.ACC_CODE || null;
        this.ACC_NAME = options.ACC_NAME || null;
        this.OLD_ACC_CODE = options.OLD_ACC_CODE || null;
        this.DESCR = options.DESCR || null;
        this.PARENT_NAME = options.PARENT_NAME || null;
        this.PARENT_ACC_NO = options.PARENT_ACC_NO || null;
        this.ACTIVE = options.ACTIVE || 1;
        this.ORDER_SL = options.ORDER_SL || null;
        this.DEFAULT_CUR_NO = options.DEFAULT_CUR_NO || null;
        this.COST_FLG = options.COST_FLG || 0;
        this.RECURRING_FLAG = options.RECURRING_FLAG || 0;
        this.SUMMARY_REPORT_LVL = options.SUMMARY_REPORT_LVL || null;
        this.COST_SEL_TYPE = options.COST_SEL_TYPE || "S";
        this.chartCostList = options.chartCostList || new Array();
        this.BA_FLG = options.BA_FLG || null;
        this.REF_ACC_NO = parseInt(options.REF_ACC_NO) || null;
        this.MAP_ACC = options.MAP_ACC || null;
        this.BA_SEL_TYPE = options.BA_SEL_TYPE || "S";
        this.BU_NAME = options.BU_NAME || '';
        this.chartBaList = options.chartBaList || new Array();
        this.costCenterList = options.costCenterList || new Array();
        this.BU_NO = parseInt(options.BU_NO) || null;
        this.CNT = options.CNT || null;
        this.ALLOCATION_ACTIVE = options.ALLOCATION_ACTIVE || null;
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || null;
        this.ALLOCATION_PER = options.ALLOCATION_PER || null;
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this.ACC_NO = options.ACC_NO || null;
        this.LVL = options.LVL || null;
        this.POST_FLG = options.POST_FLG || null;
        this.companyList = options.companyList || new Array();
        this.costAllocationList = options.costAllocationList || new Array();
    }
 }
