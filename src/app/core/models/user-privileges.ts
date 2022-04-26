import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { BaseEntity } from './base-entity';
/**
 * Model of User Privillage
 */
export class UserPrivileges extends BaseEntity {
  CAN_CREATE: boolean;
  CAN_MODIFY: boolean;
  CAN_REMOVE: boolean;
  CAN_VIEW: boolean;

  SUBMENU_NAME_USER: string;
  SUBMENU_NO: number;
  SUBMENU_TYPE: string;
    constructor(options: any = {}) {
      super();
    /// Bank class attribute
    this.CAN_CREATE = (options.CAN_CREATE === 1 || options.CAN_CREATE === true) ? true : false ;
    this.CAN_MODIFY =(options.CAN_MODIFY === 1 || options.CAN_MODIFY === true) ? true : false ;
    this.CAN_REMOVE = (options.CAN_REMOVE === 1 || options.CAN_REMOVE === true) ? true : false ;
    this.CAN_VIEW = (options.CAN_VIEW === 1 || options.CAN_VIEW === true) ? true : false ;
    this.SUBMENU_NAME_USER = options.SUBMENU_NAME_USER || '';
    this.SUBMENU_NO = options.SUBMENU_NO || null;
    this.SUBMENU_TYPE = options.SUBMENU_TYPE || '';
  }

  canShowData(SQL_STATE?: number): boolean{ 
    return SQL_STATE !== fixedValues.sqlState.sqlDelete && (this.CAN_VIEW || SQL_STATE == fixedValues.sqlState.sqlInsert); 
  }

  canEdidData(SQL_STATE: number): boolean{
    return (this.CAN_CREATE || SQL_STATE == fixedValues.sqlState.sqlInsert) || this.CAN_MODIFY ;
  }
  
  canShowSave(){
    return this.CAN_MODIFY || this.CAN_CREATE || this.CAN_REMOVE;
  }

  canShowNew(){
    return this.CAN_CREATE;
  }

  canShowEdit(){
    return this.CAN_MODIFY ;
  }

  canShowDelete(){
    return this.CAN_REMOVE ;
  }
  
  canShowButton(){
    return this.CAN_VIEW ;
  }

  canNewButNotEdit(SQL_STATE){
    return !this.CAN_MODIFY && SQL_STATE ==  fixedValues.sqlState.sqlUpdate;
  }

  canNewButNotEditGrid(SQL_STATE){
    return !this.CAN_MODIFY && SQL_STATE ==  fixedValues.sqlState.sqlInsert;
  }

  checkEditablePrev(params) {
    if(this.CAN_MODIFY){
      return true;
    }else{
      return this.canNewButNotEditGrid(params.data.SQL_STATE);
    }
  }

  checkDeletePrev(params){
    if(params.data.SQL_STATE=== fixedValues.sqlState.sqlInsert) {
      return true;
    } else return this.canShowDelete()
  }

  checkEditButton(params){
    if(params.data.SQL_STATE=== fixedValues.sqlState.sqlInsert) {
      return true;
    } else return this.canShowEdit()
  }
	trackByFn(index, item) {
		return index; // or item.id
	}
}
