/* angular stuff */

/* 3rd party libraries */

/* our own stuff */
import { globalVariables } from "src/app/core/constants/globalVariables";

// server url configuration
let url = {
    apiUrl: globalVariables.ERP_URL.apApiUrl
};

// others
export const apConfig = {
    url: url,
    defaultDateFormat: globalVariables.defaultDateFormat
}