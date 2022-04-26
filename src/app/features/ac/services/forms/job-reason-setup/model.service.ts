import { Injectable } from "@angular/core";

/* our own stuff */
import { JobReason } from "../../../models/job-reason.model";
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
  providedIn:'root'
})

export class ModelService{
    
  public jobReasonList = new Array<JobReason>();
  public jobReasonListBacup = new Array<JobReason>();
  public userPrivilege: UserPrivileges;
 

  
  constructor() {
    this.userPrivilege = new UserPrivileges();
   }
}