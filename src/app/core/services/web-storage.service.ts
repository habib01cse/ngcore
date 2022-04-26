import { Injectable } from '@angular/core';
import { globalVariables } from '../constants/globalVariables';
@Injectable({
  providedIn: 'root'
})
export class WebStorageService{
  private cookieKey = "AUTH_TOKEN_KEY";
  private cookieValue = "AUTH_TOKEN_VALUE";
  private tokenKey = 'AuthToken'

  constructor() {}

  signOut() {
    this.removeCookie();
    this.removeUserData();
  }

  setCookie() {
    document.cookie = this.cookieKey + "=" + this.cookieValue + ";path=/";
  }
  removeCookie() {
    document.cookie = this.cookieKey + "=; expires=Thu, 01 JAN 1970 12:00:00 UTC; path=/";
  }

  getCookie() {
    if (this.getToken() == "") {
      return "";
    }
    var name = this.cookieKey + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public saveToken(token: string) {
    window.localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string {
    if (window.localStorage.getItem(this.tokenKey)) {
      return window.localStorage.getItem(this.tokenKey);
    }
    else return "";
  }

  public saveUser(user, companyList) {    
    user.menu = [];
    globalVariables.userInfo = user;
    globalVariables.companyList = companyList;
    window.localStorage.setItem('user', JSON.stringify(user));
    window.localStorage.setItem('companyList', JSON.stringify(companyList));
    window.localStorage.setItem('BU_NAME', user.bu_NAME);
    window.localStorage.setItem('BU_NO', user.bu_NO);
    window.localStorage.setItem('COMPANY_NAME', user.company_NAME);
    window.localStorage.setItem('COMPANY_NO', user.company_NO.toString());
    window.localStorage.setItem('EMP_ID', user.emp_ID);
    window.localStorage.setItem('EMP_NAME', user.emp_NAME);
    window.localStorage.setItem('EMP_NO', user.emp_NO.toString());
    window.localStorage.setItem('JOBTITLE', user.jobtitle);
    window.localStorage.setItem('PLAN_COMPANY_NO', '-1');
    const sessionNo = parseInt(user.user_NO) + Date.now();
    window.localStorage.setItem('SESSION_NO', sessionNo.toString());
    window.localStorage.setItem('USER_COMPANIES', JSON.stringify(companyList));
    window.localStorage.setItem('USER_NAME', user.user_NAME);
    window.localStorage.setItem('USER_NO', user.user_NO.toString());
    WebStorageService.setUserGloablData();
  }

  public saveMenu(dataList) {
    // dataList = this.menuList;
    window.localStorage.setItem('MENU_M', '');
    window.localStorage.setItem('MENU_F', '');
    window.localStorage.setItem('MENU_G', '');
    window.localStorage.setItem('MENU_P', '');
    window.localStorage.setItem('MENU_ALL', '');


    let map = new Map();
    map.set("M", new Array());
    map.set("F", new Array());
    map.set("P", new Array());
    map.set("G", new Array());
    for (let item of dataList) {
      if (item) {
        let itemType = item.SUBMENU_TYPE;
        let parentObjNo = item.PARENT_OBJ_NO;

        if (parentObjNo && parentObjNo == "M") {
          map.get("M").push(item);
        } else if (itemType == "M") {
          map.get("F").push(item);
          map.get("P").push(item);
          map.get("G").push(item);
        } else if (itemType == "F") {
          map.get("F").push(item);
        } else if (itemType == "P") {
          map.get("P").push(item);
        } else if (itemType == "G") {
          map.get("G").push(item);
        }
      }
    }

    map.set("F", this.clearEmptyParent(map.get("F")));
    map.set("P", this.clearEmptyParent(map.get("P")));
    map.set("G", this.clearEmptyParent(map.get("G")));

    window.localStorage.setItem('MENU_M', JSON.stringify(map.get("M")));
    window.localStorage.setItem('MENU_F', JSON.stringify(map.get("F")));
    window.localStorage.setItem('MENU_P', JSON.stringify(map.get("P")));
    window.localStorage.setItem('MENU_G', JSON.stringify(map.get("G")));

  }

  private clearEmptyParent(list) {
    let rList = new Array();
    list.forEach(item => {
      let objNo = item.OBJ_NO;
      let isObject = item.IS_OBJECT;
      if (isObject === 0) {
        for (let item2 of list) {
          let parentNo = item2.PARENT_OBJ_NO;
          if (objNo == parentNo) {
            rList.push(item);
            break;
          }
        }
      } else {
        rList.push(item);
      }
    });
    return rList;
  }


  public hasAccess(menuId) {
    try {
      menuId = menuId.toUpperCase();
      var allMenu: any = [...this.getMenu("MENU_F"), ...this.getMenu("MENU_P"), ...this.getMenu("MENU_G")];
      let menuObject = allMenu.find((node) => {
        return node.MENU_ID == menuId;
      });
      if (menuObject) {
        return true;
      }
    }
    catch (err) {
    }
    return false;
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  public getMenu(trpe) {
    return JSON.parse(window.localStorage.getItem(trpe));
  }

  public getModule() {
    return JSON.parse(window.localStorage.getItem('MENU_M'));
  }

  public static setUserGloablData() {
    globalVariables.userInfo = JSON.parse(window.localStorage.getItem('user'));
    globalVariables.companyList = JSON.parse(window.localStorage.getItem('companyList'));
  }

  public getCompany() {
    return JSON.parse(window.localStorage.getItem('companyList'));
  }

  public removeUserData() {
    window.localStorage.clear();
  }

  public getData(key){
    if (window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key);
    }
    else return "";
  }
  public getSesionNo() {
    return localStorage.SESSION_NO;
  }



}
