import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared';
import { Router } from '@angular/router';
import { NavService } from 'src/app/shared';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';


@Component({
  selector: 'app-company-change',
  template: `
      <div class="ps-select ps-select--large ">
        <select class="form-control" [(ngModel)]="activeCompany" name="activeCompany" (change)="onChangeCompany()">
          <option *ngFor="let company of companyList"  [value]="company.COMPANY_NO">{{ company.COMPANY_NAME }}</option>
        </select>
      </div>
  `
})
export class CompanyChangeComponent implements OnInit {
  companyList = [];
  activeCompany: number;
  activeCompanyName: string;

  constructor(
    private commonService: CompanyService,
    private router: Router,
    private strogeServce: WebStorageService,
    private dataService: NavService,
    private alertService: AlertService
  ) {

  }


  ngOnInit() {
    const companyObj = this.commonService.getUserGlobalCompany();
    this.companyList = companyObj.companyList
    this.activeCompany = globalVariables.userInfo.company_NO;
    this.activeCompanyName = globalVariables.userInfo.company_NAME;
  }

  onChangeCompany() {
    let _this = this;
    this.dataService.changeCompany(_this.activeCompany).subscribe(
      data => {
        if (data.status == 200) {
          let activeComInfo = _this.companyList.filter(function (el) {
            return el.COMPANY_NO == _this.activeCompany;
          });
          _this.activeCompanyName = activeComInfo[0].COMPANY_NAME;
          let user = _this.strogeServce.getUser();
          let company = _this.strogeServce.getCompany();
          user.company_NO = activeComInfo[0].COMPANY_NO;
          user.company_NAME = activeComInfo[0].COMPANY_NAME;
          _this.strogeServce.saveToken(data.header.TOKEN);
          _this.strogeServce.saveUser(user, company);
          _this.strogeServce.saveMenu(data.body.menu);
          window.location.reload();
        }
      },
      (err) => {
        this.alertService.warning(err.message);
      }
    );

  }
  trackByFn(index, item) {
    return index; // or item.id
  }
}
