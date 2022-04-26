(function (window) {
  var HOST_NAME = window.location.hostname;
  var APP_API_PATH= (APP_API_ORIGIN_LOCAL.indexOf(HOST_NAME)>-1?APP_API_ORIGIN_LOCAL:APP_API_ORIGIN_REAL)+APP_API_CONTEXT_PATH;
  var APP_REPORT_PATH= (APP_API_ORIGIN_LOCAL.indexOf(HOST_NAME)>-1?APP_REPORT_ORIGIN_LOCAL:APP_REPORT_ORIGIN_REAL)+APP_REPORT_CONTEXT_PATH;
  var APP_BI_PATH=(APP_BI_ORIGIN_LOCAL.indexOf(HOST_NAME)>-1?APP_BI_ORIGIN_LOCAL:APP_BI_ORIGIN_REAL)+APP_BI_CONTEXT_PATH;
  var assetHost = "";
    // erp modules url for poduction
    
    var ERP_URL = {
      adminApiUrl: APP_API_PATH,
      gsApiUrl: APP_API_PATH,
      hrApiUrl: APP_API_PATH + 'hr/',
      acApiUrl: APP_API_PATH + 'ac/',
      slApiUrl: APP_API_PATH + 'sl/',
      inApiUrl: APP_API_PATH + 'in/',
      grApiUrl: APP_API_PATH + 'gr/',
      saApiUrl: APP_API_PATH + 'sa/',
      biApiUrl: APP_API_PATH + 'bi/',
      prApiUrl: APP_API_PATH + 'pr/',
      psApiUrl: APP_API_PATH + 'ps/',
      apApiUrl: APP_API_PATH + 'ap/',
    };
  
    var VERSION = 'v1.0.0-dev'
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    // window.__env.enableDebug = true;
  
    // environment variables
    var __env = {
      ERP_URL_DEV: ERP_URL,
      ERP_URL_QA: ERP_URL,
      ERP_URL_PROD: ERP_URL,
  
      VERSION_DEV: VERSION,
      VERSION_QA: VERSION,
      VERSION_PROD: VERSION,
  
      REPORT_HOST_IP: APP_REPORT_PATH,
      REPORT_PATH: APP_REPORT_FILE_PATH,
  
      ASSET_HOST:assetHost,
      IFRAME_HOST:APP_BI_PATH,
      CLIENT_NAME:APP_CLIENT_NAME,
      CLIENT_CODE:APP_CLIENT_CODE,
      BI_ENABLE: APP_BI_ENABLE,
      PAGE_MASTER_BUTTON_ACTIVE: APP_PAGE_MASTER_BUTTON_ACTIVE,
      FORM_MASTER_BUTTON_ACTIVE: APP_FORM_MASTER_BUTTON_ACTIVE,
    };
  
    window.__env = window.__env || {};
    window.__env = __env;
  
  }(this));
  