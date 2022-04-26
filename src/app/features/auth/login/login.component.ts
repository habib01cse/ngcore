import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { AutoLogoutService } from 'src/app/core/services/auto-logout.service';
import { environment } from 'src/environments/environment';
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})


export class LoginComponent implements OnInit {
  companyList: Array<any>[] = [];
  username: string = "";
  password: string = "";
  selectedCompany = null;
  blocked: boolean = false;

  clientName = environment.CLIENT_NAME

  @ViewChild('submit', {static:true, read:ElementRef}) submitButton;

  constructor(private router: Router
    , private authDataService: DataService
    , private storageService: WebStorageService
    , private toastr: ToastrService
    , private lockService: AutoLogoutService) { }

  ngOnInit() {    
    if (this.storageService.getCookie()) { 
      this.router.navigate(['home']); 
    } else {
      this.lockService.setCondition(1, 0);
    }
    
  }

  // Press Enter key 
  callLoninAction(event){
    if (event.key === "Enter") {              
      $("#loginBtn").click();               
    }
  }

  //without API
  atemptLogin(enent:any): void {    
    if (!enent.validate().isValid) {
      return;
    }
    let data = JSON.parse( this.storageService.getData( globalVariables.DAMI_LOGIN_RESPONSE));  
    console.log('getRes login', data);
    let menu=data.body.menu;
    data.body.login_time=new Date();
    this.storageService.setCookie()
    this.storageService.saveToken(data.header.TOKEN);
    this.storageService.saveUser(data.body, this.companyList)
    this.storageService.saveMenu(menu);
    this.lockService.lastRefreshAction = Date.now();
    this.lockService.initInterval();
    this.router.navigate(['home']);   
  }
  
  
  // With API 
  // atemptLogin
  // atemptLogin(enent:any): void {    
  //   if (!enent.validate().isValid) {
  //     return;
  //   }

  //   this.authDataService.attemptAuth(this.username, this.password, this.selectedCompany).subscribe(
  //     data => {
  //       if (data.status == 200) {
  //         let menu=data.body.menu;
  //         data.body.login_time=new Date();
  //         this.storageService.setCookie()
  //         this.storageService.saveToken(data.header.TOKEN);
  //         this.storageService.saveUser(data.body, this.companyList)
  //         this.storageService.saveMenu(menu);
  //         this.lockService.lastRefreshAction = Date.now();
  //         this.lockService.initInterval();
  //         this.router.navigate(['home']);
  //       }
  //       else {
  //         this.toastr.error(data.message,'Error');
  //       }
  //     },
  //     (err) => {   
  //     }
  //   );
  // }

  // checkCompany
  checkCompany() {
    if (!this.username.trim()) { return; }
    this.blocked = true;
    // Without API       
    let getRes = JSON.parse( this.storageService.getData( globalVariables.DAMI_COMPANY_LIST));  
    if(getRes){
      this.companyList = getRes;
      this.blocked = false;
    }
    
    // API Request 
    // this.authDataService.getCompanyList(this.username).subscribe(
    //   data => {
    //     this.companyList = data.body;
    //     this.blocked = false;
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.blocked = false;
    //   }
    // );
  }
  onChangeNgModel(){
    if(this.selectedCompany !== null){
      this.submitButton.nativeElement.focus();
    }
  }



  private validationOptions: any = {
    "username": {
      "required": {
        "message": "User name required",
      }
    },
    "password": {
      "required": {
        "message": "Password required",
      }
    },
    "selectedCompany": {
      "required": {
        "message": "Company required",
      }
    }
  }

}
