/* angular stuff */

/* 3rd party libraries */

/* our own stuff */
// import { environment } from "src/environments/environment";
import { globalVariables } from "src/app/core/constants/globalVariables";

// language configuratio

let defaultLanguage = 'en';
let defaultERPModule: '';
let defaultApiUrl = globalVariables.ERP_URL.acApiUrl;
let defaultDateFormat = globalVariables.dateFormat.dateFormat;
let defaultOutputFormat = 'PDF';

export const config: any = {
    defaultERPModule: defaultERPModule,
    defaultApiUrl: defaultApiUrl,
    defaultLanguage: defaultLanguage,
    defaultDateFormat: defaultDateFormat,
    defaultOutputFormat: defaultOutputFormat,
    
}