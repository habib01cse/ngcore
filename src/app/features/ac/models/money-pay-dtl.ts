import { BaseEntity } from "src/app/core/models/base-entity";

export class MoneyPayDtl extends BaseEntity {
  MONEYPAYDTLNO: number;
  MONEYPAY_NO: number;
  MONEYREQ_NO: number;
  MONEYSCHEDULE_NO: number;
  SUPPLIER_NO: number;
  WO_NO: number;
  PAY_AMT: number;
  EXCHANGE_RATE: number;
  CUR_NO: number;
  COST_NO: number;
  DEDUCTION: number;
  AUDITED_VALUE: number;
  TRN_LIST: string;

  //Non DB

  COST_NAME: string;
  COMPANY_NO: number;
  INVOICE_VALUE: number;
  DOC_NO: string;
  LC_DATE: Date;
  BBLC_NO: number;
  
  

  _PK: string;
  _ID: string;
  constructor(options: any = {}) {
    super(options);
    this.MONEYPAYDTLNO = options.MONEYPAYDTLNO ? options.MONEYPAYDTLNO : null;
    this.PAY_AMT = options.PAY_AMT ? options.PAY_AMT : null;
    this.MONEYPAY_NO = options.MONEYPAY_NO ? options.MONEYPAY_NO : null;
    this.MONEYREQ_NO = options.MONEYREQ_NO ? options.MONEYREQ_NO : null;
    this.LC_DATE = options.LC_DATE ? new Date : null;
    this.MONEYSCHEDULE_NO = options.MONEYSCHEDULE_NO ? options.MONEYSCHEDULE_NO : null;
    this.SUPPLIER_NO = options.SUPPLIER_NO   ? options.SUPPLIER_NO : null;
    this.WO_NO = options.WO_NO ? options.WO_NO : null;
    this.EXCHANGE_RATE = options.EXCHANGE_RATE ? options.EXCHANGE_RATE : null;
    this.CUR_NO = options.CUR_NO ? options.CUR_NO : null;
    this.COST_NO = options.COST_NO ? options.COST_NO : null;
    this.DEDUCTION = options.DEDUCTION ? options.DEDUCTION : null;
    this.CUR_NO = options.CUR_NO ? options.CUR_NO : null;
    this.AUDITED_VALUE = options.AUDITED_VALUE ? options.AUDITED_VALUE : null;

    this.COMPANY_NO = options.COMPANY_NO ? options.COMPANY_NO : null;
    this.COST_NAME = options.COST_NAME ? options.COST_NAME : null;
    this.INVOICE_VALUE = options.INVOICE_VALUE ? options.INVOICE_VALUE : null;
    this.DOC_NO = options.DOC_NO ? options.DOC_NO : null;    
    this.TRN_LIST = options.TRN_LIST ? options.TRN_LIST : '';    
    
    this._PK = "MONEYPAYDTLNO";
   
  }
}
