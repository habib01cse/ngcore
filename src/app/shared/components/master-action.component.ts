import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MasterActionService } from '../services/master-action.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import * as $ from 'jquery';
import { PageSizeService } from '../services/page-size.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: '[app-master-action]',
  templateUrl: './../templates/master-action.component.html'
})
export class MasterActionComponent implements OnInit {
  private destroyed = new Subject<any>();

  left:boolean = true;
  isPrintDisabled:boolean = true;
  bottom:boolean = true;
  isBackDisabled:boolean = true;
  isCutDisabled:boolean = true;
  isCopyDisabled:boolean = true;
  isPasteDisabled:boolean = true;

  isSaveDisabled:boolean = true;
  isResetDisabled:boolean = true;
  isNewDisabled:boolean = true;
  isDeleteDisabled:boolean = true;
  isFirstDisabled:boolean = true;
  isPrevDisabled:boolean = true;
  isNextDisabled:boolean = true;
  isLastDisabled:boolean = true;

  isHistoryDisabled:boolean = true;
  isPrivilegeDisabled:boolean = true;
  isDbObjectDisabled:boolean = true;
  isHelpDisabled:boolean = true;
  isTabIndexDisabled:boolean = true;


  public pageSize = globalVariables.pageSize;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private actionService:MasterActionService,
    
    private pageSizeService: PageSizeService,
    ) { }

  ngOnInit() {
    this.pageSize = this.pageSizeService.getPageSize();
    this.isTabIndexDisabled = !globalVariables.isTabIndexSetUser;
    this.disableAll();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.disableAll();
    });
    if(globalVariables.actionsButtons.isEnableBreadcumbButton){
      this.actionService._checkView$.subscribe(result=> {
        setTimeout(() => {
          this.checkForActions(); 
        }, 1000);
      });
    }
   
  }

  disableAll() {
    this.isSaveDisabled = true;
    this.isResetDisabled = true;
    this.isNewDisabled = true;
    this.isDeleteDisabled = true;
    this.isFirstDisabled = true;
    this.isPrevDisabled = true;
    this.isNextDisabled = true;
    this.isLastDisabled = true;
  }

  onClickAction(type:string) {
    switch (type) {
      case 'Save':
        try {
          document.getElementById('psMasterSave').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Reset':
        try {
          document.getElementById('psMasterReset').click();
        } catch (error) {console.warn(error);}
        break;
      case 'New':
        try {
          document.getElementById('psMasterNew').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Delete':
        try {
          document.getElementById('psMasterDelete').click();
        } catch (error) {console.warn(error);}
        break;
      case 'First':
        try {
          document.getElementById('psMasterFirst').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Prev':
        try {
          document.getElementById('psMasterPrev').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Next':
        try {
          document.getElementById('psMasterNext').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Last':
        try {
          document.getElementById('psMasterLast').click();
        } catch (error) {console.warn(error);}
        break;
      case 'Tabindex':
        try {
          document.getElementById('showTabIndexButton').click();
        } catch (error) {console.warn(error);}
        break;
    
      default:
        break;
    }
  }
  onChangePageSize(){
    // console.log("pageSize", this.pageSize);
    // localStorage.setItem('pageZize',  this.pageSize);
    // $("#customSizeCssLink").attr("href", `assets/css/size-${this.pageSize}.css`);
    this.pageSizeService.setPageSize(this.pageSize)
  }

  checkForActions() {
    this.isSaveDisabled = (document.getElementById('psMasterSave'))?false:true;
    this.isResetDisabled = (document.getElementById('psMasterReset'))?false:true;
    this.isNewDisabled = (document.getElementById('psMasterNew'))?false:true;
    this.isDeleteDisabled = (document.getElementById('psMasterDelete'))?false:true;
    this.isFirstDisabled = (document.getElementById('psMasterFirst'))?false:true;
    this.isPrevDisabled = (document.getElementById('psMasterPrev'))?false:true;
    this.isNextDisabled = (document.getElementById('psMasterNext'))?false:true;
    this.isLastDisabled = (document.getElementById('psMasterLast'))?false:true;
    // console.log("this.isDeleteDisabled",this.isDeleteDisabled);
  }
  

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  

}
