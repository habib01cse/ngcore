import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Nav } from 'src/app/shared/models/nav';
import { NavService } from 'src/app/shared';
import { CompanyService } from 'src/app/shared';
import { Router } from '@angular/router';
import { globalVariables } from '../core/constants/globalVariables';
import { I18nService } from '../core/services/i18n.service';
import { LangService } from '../core/services/lang.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { AlertService } from '../shared/popup/service/alert.service';
import { DataLoadService } from '../shared/services/data-load.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  companyList=[];
  selectedCompany = {}
  currentLanguageActive = globalVariables.currentLanguage;

  activeCompany;
  activeCompanyName:string;
  moduleList :any=[]; 

  constructor(
    private commonService:CompanyService,
    private router: Router,
    private i18nService:  I18nService,
    public langService: LangService,
    private dataService: NavService,
    private storageService: WebStorageService,
    private alertService: AlertService,
    private dataLoadService :DataLoadService 
    ) {

  }

  
  ngOnInit() {
    const companyObj = this.commonService.getUserGlobalCompany();
    this.companyList = companyObj.companyList
    this.activeCompany = globalVariables.userInfo.company_NO;
    this.activeCompanyName = globalVariables.userInfo.company_NAME;
    this.moduleList=this.storageService.getModule();
  }
}
