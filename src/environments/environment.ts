// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ERP_URL : window['__env']['ERP_URL_DEV'],
  version: window['__env']['VERSION_DEV'],
  REPORT_HOST_IP: window['__env']['REPORT_HOST_IP'],
  REPORT_PATH: window['__env']['REPORT_PATH'],
  ASSET_HOST: window['__env']['ASSET_HOST'],
  IFRAME_HOST: window['__env']['IFRAME_HOST'],
  CLIENT_NAME: window['__env']['CLIENT_NAME'],
  CLIENT_CODE: window['__env']['CLIENT_CODE'],
  BI_ENABLE: window['__env']['BI_ENABLE'],
  PAGE_MASTER_BUTTON_ACTIVE: window['__env']['PAGE_MASTER_BUTTON_ACTIVE'],
  FORM_MASTER_BUTTON_ACTIVE: window['__env']['FORM_MASTER_BUTTON_ACTIVE'],
  // version: env.npm_package_version + '-dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
