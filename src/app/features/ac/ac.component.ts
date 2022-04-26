import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Nav } from 'src/app/shared/models/nav';
import { NavService } from 'src/app/shared';
import { CompanyService } from 'src/app/shared';
import { forkJoin, Observable } from 'rxjs';
import { NavSwitchComponent } from 'src/app/shared/components/nav-switch.component';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { TitleService } from 'src/app/core/services/title.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { config } from "src/app/core/core.config";
import { I18nService } from 'src/app/core/services/i18n.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { LangService } from 'src/app/core/services/lang.service';
import { trigger, state, transition, style, animate, query, group, keyframes } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { CoreExceptionHandler } from 'src/app/core/core.exception.handler';
import { NavDropdonwnComponent } from 'src/app/shared/components/nav-dropdonwn.component';

@Component({
  selector: 'app-ac',
  templateUrl: './ac.component.html',
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ]),


    trigger('routeAnimation', [


      // transition('1 => 2, 2 => 3', [
      //     style({ height: '!' }),
      //     query(':enter', style({ transform: 'translateX(100%)' })),
      //     query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      //     // animate the leave page away
      //     group([
      //         query(':leave', [
      //             animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
      //         ]),
      //         // and now reveal the enter
      //         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      //     ]),
      // ]),
      transition('* <=> *', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s cubic-bezier(1,1,1,1)', style({
              transform: 'translateX(100%)',
            })),
            // animate(".4s", keyframes([
            //   style({ transform: "rotateY(0deg)", offset: 0 }),
            //   style({ transform: "rotateY(-90deg)", offset: 1 })
            // ]))
          ], { optional: true }),
          // and now reveal the enter
          query(':enter',
            // animate(".3s", keyframes([
            //   // style({ transform: "rotateY(-360deg)", offset: 0 }),
            //   style({ transform: "rotateY(0deg)", offset: 1 })
            // ]))
            animate('0.3s cubic-bezier(1,1,1,1)', style({
              transform: 'rotateX(0)',
            }))

          ),
        ]),
      ]),
      //   transition('2 => 3, 3=>2', [
      //     style({ height: '!' }),
      //     query(':enter', style({ transform: 'translateX(-100%)' })),
      //     query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      //     // animate the leave page away
      //     group([
      //         query(':leave', [
      //             animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
      //         ]),
      //         // and now reveal the enter
      //         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      //     ]),
      // ]),
    ])



  ],
})
export class AcComponent implements OnInit {
  showMenu = false;
  activeMenu: string;
  companyList = [];
  selectedCompany = {};
  currentLanguageActive = globalVariables.currentLanguage;
  langItem: any;
  activeCompanyName;
  activeCompanyNo;

 
 constructor(
    private sideNavs: NavService,
    private hrCommonService: CompanyService,
    private storage: WebStorageService,
    public titleService: TitleService,
    private i18nService: I18nService,
    private router: Router,
    public langService: LangService
  ){
   }

  ngOnInit() {
    const companyObj = this.hrCommonService.getUserGlobalCompany();
    this.companyList = companyObj.companyList
    this.selectedCompany = companyObj.company;
    this.activeCompanyName = globalVariables.userInfo.company_NAME;
    this.activeCompanyNo = globalVariables.userInfo.company_NO;      
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  isStateChange = false;
  //state: string = '2';
  getDepth(outlet) {
    return outlet.activatedRouteData.state;
  }

}
