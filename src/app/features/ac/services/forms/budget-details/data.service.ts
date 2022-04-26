import { Injectable } from "@angular/core";
import { acConfig } from "../../../ac.config";
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { DataLoadService } from "src/app/shared/services/data-load.service";
import { globalVariables } from "src/app/core/constants/globalVariables";



@Injectable({
    providedIn: 'root'
})

export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1048';

    constructor(private apiService: BaseDataService
        , private dataLoadData: DataLoadService) { }



    // getBudgets(
    public getBudgets(): any {
        return this.dataLoadData.load("FG_AC1048_GET_BUDGETS", { P_TOKEN_NO: localStorage.AuthToken })
    }

    // getBudgets(
    public getBudgetDetails(): any {
        return this.dataLoadData.load("FG_AC1048_GET_BUDGET_DTLS", { P_TOKEN_NO: localStorage.AuthToken  })
    }

}