/* angular stuff */

/* 3rd party libraries */

/* our own stuff */
import { globalVariables } from "src/app/core/constants/globalVariables";
import { core } from "@angular/compiler";

// server url configuration
let url = {
    apiUrl: globalVariables.ERP_URL.acApiUrl
};

// others
export const acConfig = {
    url: url,
    defaultDateFormat: globalVariables.dateFormat.dateFormat    
}