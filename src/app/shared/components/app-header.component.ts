import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared';
import { Router } from '@angular/router';
import { NavService } from 'src/app/shared';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { I18nService } from 'src/app/core/services/i18n.service';
import { LangService } from 'src/app/core/services/lang.service';
import * as $ from 'jquery';
import { NavSwitchComponent } from './nav-switch.component';
import { NavDropdonwnComponent } from './nav-dropdonwn.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl:'./../templates/app-header.component.html'
})
export class AppHeaderComponent implements OnInit {


  @ViewChild(NavSwitchComponent, { static: true }) child: NavSwitchComponent;
  @ViewChild(NavDropdonwnComponent, { static: true })  nav: NavDropdonwnComponent;
   
  @Input() left : boolean=true;
  @Input() menu: boolean=true;

  showDashboard = environment.BI_ENABLE;

  activeCompanyNo:number;
  activeCompanyName:string;
  public isFullscreen = false;
  currentLanguageActive = globalVariables.currentLanguage;
  user:any;
  constructor(
    private commonService:CompanyService,
    private router: Router,
    private strogeServce: WebStorageService,
    private navService: NavService,
    private alertService: AlertService,
    private i18nService: I18nService,
    public langService: LangService
    ) {
  }
  ngOnInit() {
    this.nav.createNav(this.child);
    const companyObj = this.commonService.getUserGlobalCompany();
    this.activeCompanyNo = globalVariables.userInfo.company_NO;
    this.activeCompanyName = globalVariables.userInfo.company_NAME;
    this.user=globalVariables.userInfo;
    this.initFullScreenFunction();
    this.initDropDownToggle();
  }




  initFullScreenFunction(){
    document.querySelector('.browser-expand-icon').addEventListener('click', function () {
      var elem = document.documentElement;
      if (elem['requestFullscreen']) {
        elem['requestFullscreen']();
      } else if (elem['msRequestFullscreen']) {
        elem['msRequestFullscreen']();
      } else if (elem['mozRequestFullScreen']) {
        elem['mozRequestFullScreen']();
      } else if (elem['webkitRequestFullscreen']) {
        elem['webkitRequestFullscreen']();
      }});

    document.querySelector('.browser-shrink-icon').addEventListener('click', function () {
      if (document['exitFullscreen']) {
        document['exitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      }});

    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        this.isFullscreen = true;
      } else {
        this.isFullscreen = false;
      }
    });
  }

  onChangeLanguage(language) {
    globalVariables.currentLanguage = language;
    this.currentLanguageActive = language;
    let path = this.router.url;
    path = path.substr(1, path.length);
    let pathStr = path.split("/")[0];

    this.i18nService.getLanguageData(`${pathStr}/${language}`).subscribe(
      dataFromApi => {
        globalVariables.currentLanguageData = dataFromApi;
        this.langService.changeLang();
      },
      err => { console.log(err); }
    );
  }



  showModule = false;
  onClickHumbergerIcon() {
     this.showModule = !this.showModule;
  }

  moduleOverlayClick(agreed){
    console.log("agreed", agreed);
   this.showModule = agreed;
  }

  onKeyUpSearchField(value) {
    let filter = value.toUpperCase();
    // first label
    $("#navbarSearch > li").removeClass("d-none");
    $("#navbarSearch > li").removeClass("d-block");
    $("#navbarSearch > li").each(function () {
      if ($(this).text().toUpperCase().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('d-block')) {
        $(this).addClass('d-none');
      } else {
        $(this).addClass('d-block');
        $(this).find(' ul > li').addClass('d-block');
      }
    });


    // Second label
    $("#navbarSearch > li > ul > li").removeClass("d-none");
    $("#navbarSearch > li > ul > li").removeClass("d-block");
    $("#navbarSearch > li > ul > li").each(function () {
      if ($(this).text().toUpperCase().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('d-block')) {
        $(this).addClass('d-none');
      } else {
        $(this).addClass('d-block');
        $(this).find('ul > li > ul > li').addClass('d-block');
      }
    });
  }


  public  initDropDownToggle(){
    $('.dropdown-toggle').click(function () {
      $(this).siblings(".dropdown-menu").toggleClass('d-block');
      $('.dropdown-menu').not($(this).siblings(".dropdown-menu")).removeClass('d-block'); 
   });
 
   $('.header-search-icon').click(function (e) {
     e.preventDefault();
     $(this).siblings(".header-search-form").toggleClass('header-search-form--active');
   });
 
   $(".header-search-form__close").on("click", function (e) {
     $(this).parents(".header-search-form").removeClass('header-search-form--active');
     $(this).parents(".header-search-form").toggle();
   });
 
   $('body').on('click', function () {
     $('.dropdown-menu').removeClass('d-block');
   }).find('.dropdown .dropdown-toggle').on('click', function (event) {
     event.stopPropagation();
   });
   $('.dropdown-menu .dropdown-item').click(function () {
     $(this).parents('.dropdown-menu').removeClass('d-block');
   });
  }
}
