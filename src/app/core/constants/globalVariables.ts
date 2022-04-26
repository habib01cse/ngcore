/* angular stuff */

/* 3rd party libraries */

/* our own stuff */
import { environment } from "src/environments/environment";

// erp modules
let ERP_MODULES = {
    AC: { name: 'ac', fname: 'Accounts', code: 0, parent: 'M1004', fullName: 'Accounts & Financial Management', link:'/ac/dashboard'},
    SL: { name: 'sl', fname: 'Sales', code: 1, parent: 'M1005', fullName: 'Sales', link:'/sl/forms/sl_1024'},
    PS: { name: 'ps', fname: 'Purchase', code: 2, parent: 'M2016', fullName: 'Purchase', link:'/in/forms/in_1230'},
    IN: { name: 'in', fname: 'Material', code: 4, parent: 'M2017', fullName: 'Material Management', link:''},
    PF: { name: 'pf', fname: 'Provident Fund', code: 3, parent: 'M1002', fullName: 'Provident Fund', link:''},
    HR: { name: 'hr', fname: 'HRM', code: 5, parent: 'M1002', fullName: 'Human Capital Management' , link:'/hr/forms/hr_1137'},
    GR: { name: 'gr', fname: 'Garments', code: 6, parent: 'M2075', fullName: 'Garments' , link:'/gr/forms/gr_1323'},
    BI: { name: 'bi', fname: 'Synergy', code: 7, parent: 'M2037', fullName: 'Synergy Analytics (SA)' , link:''},
    PR: { name: 'pr', fname: 'Textiles', code: 7, parent: 'M2110', fullName: 'Textiles Process Management' , link:''},
    AP: { name: 'ap', fname: 'Etc', code: 8, parent: 'M1004', fullName: 'Test ...' , link:''}
};

let ERP_FORMS = {
    IN:["IN_1013", "IN_1059", "IN_1003", "IN_1002", "IN_1105", "IN_1216", "IN_1221", "IN_1188", "IN_1023", "IN_1005", "IN_1012", "IN_1043", "IN_1175", "IN_1051", "IN_1071", "IN_1095", "IN_1129", "IN_1128", "IN_1149", "IN_1038", "IN_1036", "IN_1019", "IN_1208", "IN_1050", "IN_1079", "IN_1068", "IN_1198", "IN_1041", "IN_1199", "IN_1235", "IN_1220", "IN_1207", "IN_1236", "IN_1205", "IN_1204", "IN_1194", "IN_1218", "IN_1206", "IN_1210", "IN_1201", "IN_1214", "IN_1213", "IN_1212", "IN_1211", "IN_1209", "IN_1203", "IN_1215", "IN_1127", "IN_1145", "IN_1131", "IN_1143", "IN_1136", "IN_1142", "IN_1134", "IN_1133", "IN_1132", "IN_1135", "IN_1144", "IN_1121", "IN_1004", "IN_1018", "IN_1014", "IN_1025", "IN_1031", "IN_1017", "IN_1016", "IN_1015", "IN_1147", "IN_1138", "IN_1160", "IN_1140", "IN_1139", "IN_1230", "IN_1237", "IN_1037", "IN_1044", "IN_1060", "IN_1130"]
}

// server url configuration
let ERP_URL = {
    adminApiUrl: environment.ERP_URL.adminApiUrl,
    gsApiUrl: environment.ERP_URL.gsApiUrl,
    hrApiUrl: environment.ERP_URL.hrApiUrl,
    acApiUrl: environment.ERP_URL.acApiUrl,
    inApiUrl: environment.ERP_URL.inApiUrl,
    slApiUrl: environment.ERP_URL.slApiUrl,
    grApiUrl: environment.ERP_URL.grApiUrl,
    biApiUrl: environment.ERP_URL.biApiUrl,
    prApiUrl: environment.ERP_URL.prApiUrl,
    saApiUrl: environment.ERP_URL.saApiUrl,
    apApiUrl: environment.ERP_URL.apApiUrl,
};

let actionsButtons = {
    isEnableBreadcumbButton: environment.PAGE_MASTER_BUTTON_ACTIVE,
    isEnableMasterButton: environment.FORM_MASTER_BUTTON_ACTIVE,
}

// key code configuration
let keyCodes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    del: 46,
    F2: 113
};

// messege code configuration
let messageCode = {

};

// date formate
let dtFormat = {
    shortYearDateFormat: "dd/MM/yy",
    //dateFormat: "dd/mm/yyyy",
    dateFormat: "dd/MM/yyyy",
    //dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "dd/MM/yy" + " hh:mm:ss a",
    monthDayFormat: "MM, dd",
    monthYearFormat: "MM, yyyy",
    timeFormat: "hh:mm a",
};

let psDateFormat = {
    showWeekNumbers: false,
    dateInputFormat: "DD/MM/YYYY",
    customTodayClass:"current-date"
}

let psDateTimeFormat = {
    showWeekNumbers: false,
    dateInputFormat: "DD/MM/YYYY, H:mm:ss", 
}
let psMonthFormat = {
    dateInputFormat: 'MM/YYYY',  
    selectFromOtherMonth: true
}

// conditional list
let conditionList = [
    { id: 1, optionName: "Euqal (==)", value: ' == ' },
    { id: 2, optionName: "Greater Than (>)", value: ' > ' },
    { id: 3, optionName: "Smaller Than (<)", value: ' < ' },
    { id: 4, optionName: "Greater Than Or Equal (>=)", value: ' >= ' },
    { id: 5, optionName: "Smaller Than Or Equal (<=)", value: ' <= ' },
    { id: 6, optionName: "Not Equal (!=)", value: ' != ' }
];

// supported language
let supportedLanguages: [
    'en-US',
    'fr-FR'
];
let reportPath = environment.REPORT_PATH ?environment.REPORT_PATH:'D:/BMS_App/Reports/';
let paramsReportBaseUrl = environment.REPORT_HOST_IP;
let paramsReportMiddleUrl = '&destype=cache&report=D:/BMS_App/Reports/AC/AC_4041&X_Emp_Id=PRI0073&X_Submenu_Id=AC_4041&X_company_no=6&X_currency_format=9,99,99,99,99,999.00&X_date_format=DD/MM/RR&X_time_format=HH24:MI&X_ROUND=2';
let tabIndexSelector = '.form-group .form-control:not([disabled]), .ps-tab-index, .custom-control .custom-control-input';
let isEnterPressNextFocus = false;
let isTabIndexSetUser = false;
let menuInfo = {
    INIT: null,
    IS_OBJECT: null,
    LVL: null,
    MENU_ID: "",
    OBJ_NAME: "",
    OBJ_NO: "",
    PARENT_MENU_ID: null,
    PARENT_OBJ_NO: "",
};

let userInfo = {
    bu_NAME: "",
    bu_NO: null,
    company_NAME: "",
    company_NO: null,
    emp_ID: "",
    emp_NAME: "",
    emp_NO: null,
    jobtitle: "",
    session_KEY: "",
    session_NO: null,
    user_NAME: "",
    user_NO: null,
    user_TYPE: null,
};

let companyInfo = {

};

let companyList = {

};

let privilegeInfo = {

};

let currencyFormat = {

};

let qtyFormat = {

};

// version
let version = 'V2.1.0';
let currentModule = '';
let currentModuleURL = '';
let currentRouter = '';
let currentLanguage = '';
let currentLanguageData = {};
let defaultDateFormat = 'dd/MM/yyyy';

//ps-decimal 
let psDecimalPrecision = '2';
let numberPrecision = '1.2-2';
let respStatus200 = '200';

let DAMI_COMPANY_LIST = 'DAMI_COMPANY_LIST';
let DAMI_LOGIN_RESPONSE = 'DAMI_LOGIN_RESPONSE';
let DAMI_PREVILIGE = 'DAMI_PREVILIGE';
let DAMI_COST_CNETER_TREE = 'DAMI_COST_CNETER_TREE';
let DAMI_JOB_REASON_LIST = 'DAMI_JOB_REASON_LIST';
let DAMI_STATEMENT_HEAD_LIST = 'DAMI_STATEMENT_HEAD_LIST';
let DAMI_FINANCIAL_STATEMENTHEAD = 'DAMI_FINANCIAL_STATEMENTHEAD';
let DAMI_STATEMENT_DETAILS = 'DAMI_STATEMENT_DETAILS';


export const globalVariables: any = {
    version: version,
    ERP_MODULES: ERP_MODULES,
    ERP_URL: ERP_URL,
    keyCodes: keyCodes,
    messageCode: messageCode,
    dateFormat: dtFormat,
    psDateFormat: psDateFormat,
    psDateTimeFormat: psDateTimeFormat,
    psMonthFormat: psMonthFormat,
    supportedLanguages: supportedLanguages,
    conditionList: conditionList,
    currentModule: currentModule,
    currentModuleURL: currentModuleURL,
    currentRouter: currentRouter,
    currentLanguage: currentLanguage,
    currentLanguageData: currentLanguageData,
    menuInfo: menuInfo,
    userInfo: userInfo,
    companyInfo: companyInfo,
    companyList: companyList,
    privilegeInfo: privilegeInfo,
    currencyFormat: currencyFormat,
    qtyFormat: qtyFormat,
    paramsReportBaseUrl: paramsReportBaseUrl,
    paramsReportMiddleUrl: paramsReportMiddleUrl,
    reportPath: reportPath,

    defaultDateFormat: defaultDateFormat,
    psDecimalPrecision: psDecimalPrecision,
    numberPrecision: numberPrecision,
    respStatus200: respStatus200,
    DAMI_COMPANY_LIST: DAMI_COMPANY_LIST,
    DAMI_LOGIN_RESPONSE: DAMI_LOGIN_RESPONSE,
    DAMI_PREVILIGE: DAMI_PREVILIGE,
    DAMI_COST_CNETER_TREE: DAMI_COST_CNETER_TREE,
    DAMI_JOB_REASON_LIST: DAMI_JOB_REASON_LIST,
    DAMI_STATEMENT_DETAILS: DAMI_STATEMENT_DETAILS,
    DAMI_STATEMENT_HEAD_LIST: DAMI_STATEMENT_HEAD_LIST,
    DAMI_FINANCIAL_STATEMENTHEAD: DAMI_FINANCIAL_STATEMENTHEAD,
    tabIndexSelector: tabIndexSelector,
    isEnterPressNextFocus: isEnterPressNextFocus,
    isTabIndexSetUser: isTabIndexSetUser,
    actionsButtons: actionsButtons,
    ERP_FORMS: ERP_FORMS,
}