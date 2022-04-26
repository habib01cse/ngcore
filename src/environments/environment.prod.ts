export const environment = {
  production: true,
  ERP_URL : window['__env']['ERP_URL_PROD'],
  version: window['__env']['VERSION_PROD'],
  REPORT_HOST_IP: window['__env']['REPORT_HOST_IP'],
  REPORT_PATH: window['__env']['REPORT_PATH'],
  ASSET_HOST: window['__env']['ASSET_HOST'],
  IFRAME_HOST: window['__env']['IFRAME_HOST'],
  CLIENT_NAME: window['__env']['CLIENT_NAME'],
  CLIENT_CODE: window['__env']['CLIENT_CODE'],
  BI_ENABLE: window['__env']['BI_ENABLE'],
  PAGE_MASTER_BUTTON_ACTIVE: window['__env']['PAGE_MASTER_BUTTON_ACTIVE'],
  FORM_MASTER_BUTTON_ACTIVE: window['__env']['FORM_MASTER_BUTTON_ACTIVE'],
};
