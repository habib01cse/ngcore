import { Injectable } from "@angular/core";
import { UserPrivileges } from "src/app/core/models/user-privileges";

/* our own stuff */
@Injectable({
  providedIn:'root'
})

export class ModelService{
 
  public gatePassRegisterList:any = [];
  public xRoundList:any = [];
  public reportInfoList:any = [];


  public userPrivilege: UserPrivileges;

  constructor() {    
    this.userPrivilege = new UserPrivileges();    
  }
  
  
}