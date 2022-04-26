import { BaseEntity } from 'src/app/core/models/base-entity';

export class TransactionDlt extends BaseEntity {
  
    public ASSET_ACC_NAME: string;
    public ASSET_ACC_NO: number;
    public BRAND: string;
    public DESCR: string;
    public ISU_QTY: string;
    public ITEM_ID: string;
    public ITEM_NAME: string; 
    public ITEM_PATH: string;
    public MANUFACTURER_NAME: string;
    public MODEL_INFO: string;
    public OFFSET_ACC_NAME: string;
    public ORIGIN: string;
    public RCV_QTY: string;
    public SOURCE_TYPE: string;
    public SRL_FLAG: number;
    public STOCK_QTY: number;
    public TRND_NO: number;
    public TRN_NO: number;
    public UOM: string;
    public ITEM_DESC: string;
    public OFFSET_ACC_NO: number; 
    public ACC_CODE: string; 
    public ITEM_NO: number;

    constructor(options: any = {}) {

      super(options);
      this.ASSET_ACC_NAME = options.ASSET_ACC_NAME || '';
      this.ACC_CODE = options.ACC_CODE || '';
      this.ASSET_ACC_NO = options.ASSET_ACC_NO || 0;
      this.BRAND = options.BRAND || '';
      this.ITEM_DESC = options.ITEM_DESC || '';
      this.DESCR = options.DESCR || '';
      this.ISU_QTY = options.ISU_QTY || '';
      this.ITEM_ID = options.ITEM_ID || '';
      this.ITEM_NAME = options.ITEM_NAME || ''; 
      this.ITEM_PATH = options.ITEM_PATH || '';
      this.MANUFACTURER_NAME = options.MANUFACTURER_NAME || '';
      this.MODEL_INFO = options.MODEL_INFO || '';
      this.OFFSET_ACC_NAME = options.OFFSET_ACC_NAME || '';
      this.OFFSET_ACC_NO = options.OFFSET_ACC_NO || 0;
      this.ORIGIN = options.ORIGIN || '';
      this.RCV_QTY = options.RCV_QTY || '';
      this.SOURCE_TYPE = options.SOURCE_TYPE || '';
      this.SRL_FLAG = options.SRL_FLAG || null;
      this.STOCK_QTY = options.STOCK_QTY || null;
      this.TRND_NO = options.TRND_NO || null;
      this.TRN_NO = options.TRN_NO || null;
      this.ITEM_NO = options.ITEM_NO || null;
      this.UOM = options.UOM || '';
    }
}
