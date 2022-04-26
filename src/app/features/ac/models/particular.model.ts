import { BaseEntity } from '../../../core/models/base-entity';

export class Particular extends BaseEntity {
  PARTICULAR_NO:number;
  PARTICULAR:string;
  DESCR:string;
  IF_SUPPLIER_REQUIRED: string;
  PARTICULAR_ID:string;
  _PK: string;
  _ID: string;
  

  constructor(options: any = {}) {
    /// Call the Base Entity Class
    super(options);
    this.PARTICULAR_NO = options.PARTICULAR_NO || null;
    this.PARTICULAR = options.PARTICULAR || null;
    this.DESCR = options.DESCR || null;
    this.PARTICULAR_ID = options.PARTICULAR_ID || '';
    this.IF_SUPPLIER_REQUIRED = (options.IF_SUPPLIER_REQUIRED==1)? 'A' : null;
    this._PK = "PARTICULAR_NO";
    this._ID = "PARTICULAR_ID";
  }
}

