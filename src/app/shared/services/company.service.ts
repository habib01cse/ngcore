import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor() { }
  getUserGlobalCompany() {
    const resultObj = {companyList: [], company: {} };

    try {
      resultObj.companyList = JSON.parse(window.localStorage.companyList);
      const userCompany = JSON.parse(window.localStorage.user);
      for (let company = 0; company < resultObj.companyList.length; company++) {
        const element = resultObj.companyList[company];
        if (userCompany.company_NO === element.COMPANY_NO) {
          resultObj.company = element;
          break;
        }
      }
    } catch (e) {} 
    return resultObj;
  }

  getSelectedCompany(companyList: any[]) {
    const userCompany = JSON.parse(window.localStorage.user);
    let companyObj = {};
    for (let company = 0; company < companyList.length; company++) {
      const element = companyList[company];
      if (userCompany.company_NO === element.COMPANY_NO) {
        companyObj = element;
        break;
      }
    }
    return companyObj;
  }
}
