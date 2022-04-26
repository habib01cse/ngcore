(function (window) {

  var API_REALIP = '203.83.188.246';
 var API_PORT = '8484'; 
  // var API_PORT='9990';
  var REPORT_REALIP = API_REALIP;
  var REPORT_LOCALIP = '192.168.111.5';
  var REPORT_PATH = 'D:/BMS_App/Reports/';
  var REPORT_PORT = '8888';

  var BI_ENABLE = true;
  //
  var assetHost = "";

  // host name
  var hostIp = window.location.hostname;
  var hostIp = '192.168.111.213';
  // var hostIp = '203.83.188.246';
  var reportHostIp = (hostIp==REPORT_REALIP)?hostIp:REPORT_LOCALIP+":"+REPORT_PORT;
  var hostName = (hostIp == API_REALIP)? API_REALIP+':'+API_PORT :hostIp+':'+API_PORT;  
  
  var api_url= 'http://' + hostName + '/pridesyserp/v1/';
  
   
 var iframeHost = 'http://192.168.111.213:9988/pridebook-bi/#/'; // use this for production
  // var iframeHost = 'http://'+hostIp+':4000/#/';

  // erp modules url for development


  var ERP_URL_DEV = {
    adminApiUrl: api_url,
    gsApiUrl: api_url,
    hrApiUrl: api_url + 'hr/',
    acApiUrl: api_url + 'ac/',
    slApiUrl: api_url + 'sl/',
    inApiUrl: api_url + 'in/',
    grApiUrl: api_url + 'gr/',
    saApiUrl: api_url + 'sa/',
  };

  // erp modules url for qa
  var ERP_URL_QA = {
    adminApiUrl: api_url + '',
    gsApiUrl: api_url + '',
    hrApiUrl: api_url + 'hr/',
    acApiUrl: api_url + 'ac/',
    slApiUrl: api_url + 'sl/',
    inApiUrl: api_url + 'in/',
    grApiUrl: api_url + 'gr/',
    saApiUrl: api_url + 'sa/',
  };

  // erp modules url for poduction
  var ERP_URL_PROD = {
    adminApiUrl: api_url,
    gsApiUrl: api_url,
    hrApiUrl: api_url + 'hr/',
    acApiUrl: api_url + 'ac/',
    slApiUrl: api_url + 'sl/',
    inApiUrl: api_url + 'in/',
    grApiUrl: api_url + 'gr/',
    saApiUrl: api_url + 'sa/',
  };

  /* versioning */
  // version for dev
  var VERSION_DEV = 'v1.0.0-dev'

  // version for qa
  var VERSION_QA = 'v1.0.0-qa'

  // version for production
  var VERSION_PROD = 'v1.0.0-prod'

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  // window.__env.enableDebug = true;

  // environment variables
  var __env = {
    ERP_URL_DEV: ERP_URL_DEV,
    ERP_URL_QA: ERP_URL_QA,
    ERP_URL_PROD: ERP_URL_PROD,

    VERSION_DEV: VERSION_DEV,
    VERSION_QA: VERSION_QA,
    VERSION_PROD: VERSION_PROD,
    REPORT_HOST_IP: reportHostIp,
    REPORT_PATH: REPORT_PATH,
    ASSET_HOST: assetHost,
    IFRAME_HOST: iframeHost,
    BI_ENABLE: BI_ENABLE,
  };

  window.__env = window.__env || {};
  window.__env = __env;

}(this));
