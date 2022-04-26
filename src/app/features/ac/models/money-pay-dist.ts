import { BaseEntity } from "src/app/core/models/base-entity";

export class MoneyPayDist extends BaseEntity {
  MONEYPAY_DIST_NO: number;
  TRAN_DATE: Date;
  MONEYPAY_NO: number;
  DR_CR_TYPE: string;
  ACC_NO: number;
  DR: number;
  CR: number;
  DESCR: string;
  CURRENCY_NO: number;
  CURRENCY: string;
  EXCHANGE_RATE: number;
  COST_NO: number;
  BA_NO: number;
  CHEQUE_NO: number;
  CHEQUE_DATE: Date;
  BANK_NAME: string;
  BANK_ACCNO: number;
  CHK_REC_NO: number;
  CHK_REC_DATE: Date;
  CHK_DEP_DATE: Date;
  CHK_VOID_DATE: Date;
  CHK_DESCRIPTION: string;
  COMPANY_NO: number;
  ACC_NAME: string;
  C_NAME: string;
  COST_NAME: string;
  BA_NAME: string;
  amountTk1: number;
  amountTk2: number;
  DR_EX: number;
  CR_EX: number;
  _PK: string;
 

  constructor(options: any = {}) {
    super(options);
    this.MONEYPAY_DIST_NO = options.MONEYPAY_DIST_NO
      ? options.MONEYPAY_DIST_NO
      : null;
    this.TRAN_DATE = options.TRAN_DATE ? options.TRAN_DATE : null;
    this.TRAN_DATE = options.TRAN_DATE ? options.TRAN_DATE : null;
    this.DR_CR_TYPE = options.DR_CR_TYPE ? options.DR_CR_TYPE.toLowerCase() == 'dr' ? "DR" : "CR" : "DR";
    this.ACC_NO = options.ACC_NO ? options.ACC_NO : null;
    this.DR = options.DR ? options.DR : null;
    this.CR = options.CR ? options.CR : null;
    this.DESCR = options.DESCR ? options.DESCR : null;
    this.CURRENCY = options.CURRENCY ? options.CURRENCY : '';
    this.CURRENCY_NO = options.CURRENCY_NO ? options.CURRENCY_NO : null;
    this.EXCHANGE_RATE = options.EXCHANGE_RATE ? options.EXCHANGE_RATE : null;
    this.COST_NO = options.COST_NO ? options.COST_NO : null;
    this.BA_NO = options.BA_NO ? options.BA_NO : null;
    this.CHEQUE_NO = options.CHEQUE_NO ? options.CHEQUE_NO : null;
    this.CHEQUE_DATE = options.CHEQUE_DATE ? options.CHEQUE_DATE : null;
    this.BANK_NAME = options.BANK_NAME ? options.BANK_NAME : null;
    this.BANK_ACCNO = options.BANK_ACCNO ? options.BANK_ACCNO : null;
    this.CHK_REC_NO = options.CHK_REC_NO ? options.CHK_REC_NO : null;
    this.CHK_REC_DATE = options.CHK_REC_DATE ? options.CHK_REC_DATE : null;
    this.CHK_DEP_DATE = options.CHK_DEP_DATE ? options.CHK_DEP_DATE : null;
    this.CHK_VOID_DATE = options.CHK_VOID_DATE ? options.CHK_VOID_DATE : null;
    this.CHK_DESCRIPTION = options.CHK_DESCRIPTION
      ? options.CHK_DESCRIPTION
      : null;
    this.COMPANY_NO = options.COMPANY_NO ? options.COMPANY_NO : null;
    this.ACC_NAME = options.ACC_NAME ? options.ACC_NAME : null;
    this.C_NAME = options.C_NAME ? options.C_NAME : null;
    this.COST_NAME = options.COST_NAME ? options.COST_NAME : null;
    this.BA_NAME = options.BA_NAME ? options.BA_NAME : null;
    this.MONEYPAY_NO = options.MONEYPAY_NO ? options.MONEYPAY_NO : null;



    // if (options.DR_CR_TYPE == "Dr") {
    //   this.amountTk1 = Number(
    //     (options.EXCHANGE_RATE
    //       ? options.EXCHANGE_RATE * options.DR
    //       : 1 * options.DR
    //     ).toFixed(2)
    //   );
    // }
    // if (options.DR_CR_TYPE == "Cr") {
    //   this.amountTk2 = Number(
    //     (options.EXCHANGE_RATE
    //       ? options.EXCHANGE_RATE * options.CR
    //       : 1 * options.CR
    //     ).toFixed(2)
    //   );
    // }
    this.DR_EX = (options.DR_CR_TYPE && options.DR_CR_TYPE.toLowerCase() == 'dr') ? (options.DR * options.EXCHANGE_RATE) : null;
    this.CR_EX = (options.DR_CR_TYPE && options.DR_CR_TYPE.toLowerCase() == 'cr') ? (options.CR * options.EXCHANGE_RATE) : null;

    this._PK = "MONEYPAY_DIST_NO";
    
  }
}
