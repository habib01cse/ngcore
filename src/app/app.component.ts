import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { config } from "src/app/core/core.config";
import * as $ from 'jquery';
import { SpinnerService } from './core/services/spinner.service';
import { AutoLogoutService } from './core/services/auto-logout.service';
import { WebStorageService } from './core/services/web-storage.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseDataService } from 'src/app/core/services';
import { PageSizeService } from './shared/services/page-size.service';
import { ToastrService } from 'ngx-toastr';

import { take } from 'rxjs/operators';
const API_URL = `${globalVariables.ERP_URL.adminApiUrl}core/auth/`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private tokenKey = 'AuthToken';
  private subscription$: Subscription;
  title = 'Angular Core';
  blocked: boolean;
  public showTabIndex = false;
  inactivityBlock: boolean = false;
  inactivityBlockShow: boolean;

  public isShowingRouteLoadIndicator: boolean;

  public pageSize = globalVariables.pageSize;
  connectOptions: any = {
    "userPassword": {
      "required": {
        "message": "Password required",
      }
    },
  }

  userPassword: string;
  constructor(
    public spinnerService: SpinnerService,
    private autoLogoutService: AutoLogoutService,
    private store: WebStorageService,
    private router: Router,
    private dataService:BaseDataService,
    private pageSizeService: PageSizeService,
    private toastr: ToastrService
  ) {
    globalVariables.currentLanguage = config.defaultLanguage;
    this.start();

    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;
    router.events.subscribe((event:RouterEvent):void =>{
      if(event instanceof RouteConfigLoadStart){
        asyncLoadCount++;
      }else if(event instanceof RouteConfigLoadEnd){
        asyncLoadCount--;
      }
      this.isShowingRouteLoadIndicator = !!asyncLoadCount;
    });
  }
  // set current language
  ngOnInit(): void {
    // localStorage.setItem('pageZize',  this.pageSize);
    // $("#customSizeCssLink").attr("href", `assets/css/size-${this.pageSize}.css`);
    this.pageSizeService.setPageSize();


    console.log(JSON.stringify({ isTimeout: this.autoLogoutService.isTimeout, getCookie: this.store.getCookie() }));
    if (this.autoLogoutService.isTimeout == 1 && this.store.getCookie()) {
      this.inactivityBlock = true;
      this.inactivityBlockShow = this.inactivityBlock;
      this.userPassword = "";
    } else {
      this.inactivityBlock = false;
      this.inactivityBlockShow = this.inactivityBlock;
      this.autoLogoutService.reset();
      this.autoLogoutService.initInterval();
    }

    this.blocked = this.spinnerService.block;
    this.subscription$ = this.autoLogoutService._isTimeOut$.subscribe(result => {
      if (result) {
        this.inactivityBlock = true;
        this.inactivityBlockShow = this.inactivityBlock;
        this.userPassword = "";
        this.autoLogoutService.isTimeout = 1;
        this.autoLogoutService.stopInterVal();
      } else {
        this.inactivityBlock = false;
        this.userPassword = "";
        this.autoLogoutService.isTimeout = 0;
        this.autoLogoutService.reset();
        this.autoLogoutService.initInterval();
        setTimeout(() => {
          this.inactivityBlockShow = this.inactivityBlock;
        }, 1000);
      }

    })
    this.blocked = this.spinnerService.block;
    if(globalVariables.isEnterPressNextFocus){
      this.initFocusEvent();
    }
    this.saveByKeboard();
  }
  public focusElementSlector = globalVariables.tabIndexSelector
  private initFocusEvent() {
    let focusSelect = this.focusElementSlector;

      $.extend($.expr[':'], {
        focusable: function (el, index, selector) {
            return $(el).is(focusSelect);
        }
    });

      
    $(document).on('keypress', this.focusElementSlector, function (e) {
      if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        
        // use @show method alternative @sort 
        $canfocus.show(function(a,b, asc){
          var result;
          if (typeof asc == "undefined") asc = true;
          let aAt = a.getAttribute('tabindex') ? a.getAttribute('tabindex') : 0;
          let bAt = b.getAttribute('tabindex') ? b.getAttribute('tabindex'): 0;

          if(aAt === null) return 1;
          if(bAt === null) return -1;
          if (aAt === null && bAt === null) return 0;

          result = aAt - bAt;
                  
          if (isNaN(result)) {
              return (asc) ? aAt.toString().localeCompare(bAt) : bAt.toString().localeCompare(aAt);
          }
          else {
              return (asc) ? result : -result;
          }
        });
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
      }
    });
  }
  onClickConnect(formValidator) {
    const validationResult = formValidator.validate();
    if (validationResult.isValid) {
      this.reConnectOnServer();
    }
  }

  onSubmitForm(){
    this.reConnectOnServer();
  }

  reConnectOnServer(){
    const data = {USER_NAME:this.store.getUser().user_NAME, PASSWORD:this.userPassword}
    this.dataService.executeQuery(`${API_URL}relogin`,data).subscribe(result=> {
      console.log(result);
      this.store.saveToken(result.header.TOKEN);
      this.inactivityBlock = false;
      setTimeout(() => {
        this.inactivityBlockShow = this.inactivityBlock;
      }, 1000);
      this.userPassword = "";
      this.autoLogoutService.isTimeout = 0;
      this.autoLogoutService.reset();
      this.autoLogoutService.initInterval();
      this.autoLogoutService.lastRefreshAction = Date.now();
      this.autoLogoutService.isLastRefreshAlive = 0;

    });
  }
  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    //console.log(event);

    if (event.type === "storage") {
      // local storage clear on logout
      if (event.key == null && event.oldValue == null && event.newValue == null) {
        this.router.navigate(['/login']);
      }
      // JWT token changed on company changed
      else if (event.key == 'COMPANY_NO' && event.oldValue != null && event.newValue != null && (event.oldValue != event.newValue)) {
        window.location.reload();
      }
      else if (event.key == 'isTimeout' && event.newValue == '1' && (event.oldValue != event.newValue)) {
        this.inactivityBlock = true;
        this.inactivityBlockShow = this.inactivityBlock;
        this.userPassword = "";
        this.autoLogoutService.stopInterVal();
      }
      else if (event.key == 'isTimeout' && event.newValue != '1') {
        this.inactivityBlock = false;
        setTimeout(() => {
          this.inactivityBlockShow = this.inactivityBlock;
        }, 1000);
        this.userPassword = "";
        this.autoLogoutService.reset();
        this.autoLogoutService.check();
        this.autoLogoutService.initInterval();
      }
      // JWT token removed
      else if (event.key == this.tokenKey && event.oldValue != null && event.newValue == null) {
        this.router.navigate(['/login']);
      }

    }

  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
  }
  onClickLogout(){
    this.autoLogoutService.setCondition(true, false);
    this.router.navigate(['/logout']);
  }

  ngOnDestroy() {
    this.stop();
    this.subscription$.unsubscribe();
  }

  saveByKeboard(){
    let _this = this;
    $(document).bind('keydown', function (e) {
      if (e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        if(!document.getElementById('psMasterSave')){
          _this.toastr.warning("Feature is not implementing here", 'Warning');
          return false;
        }
        document.getElementById('psMasterSave').click();
        return false;
      }
    });
  }
}
