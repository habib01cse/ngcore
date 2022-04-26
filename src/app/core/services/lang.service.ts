import { Injectable } from '@angular/core';
import { globalVariables } from '../constants/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public langData:any;
  

  constructor() {
    this.langData = globalVariables.currentLanguageData;
  }

  changeLang() {
    this.langData = globalVariables.currentLanguageData;
  }


}
