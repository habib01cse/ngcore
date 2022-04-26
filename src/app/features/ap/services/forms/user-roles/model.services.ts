/* Angular Stuff*/
import { Injectable } from "@angular/core";

/* our own stuff */
import { UserPrivileges } from "src/app/core/models/user-privileges";

import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


@Injectable({
    providedIn: 'root'
})

export class ModelService {
    public userPrivilege: UserPrivileges;

    public DTL_LIST = [];
    constructor() {
        this.userPrivilege = new UserPrivileges();
      
    }


}