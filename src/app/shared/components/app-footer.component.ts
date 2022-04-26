import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalVariables } from 'src/app/core/constants/globalVariables';
@Component({
  selector: 'app-footer',
  templateUrl:'./../templates/app-footer.component.html'
})
export class AppFooterComponent implements OnInit {
  public dateTimeFormat = globalVariables.dateFormat.dateFormat;
  
  activeCompanyNo:number;
  activeCompanyName:string;
  datetime = new Date();
  ip:string;
  version:string;
  empName:string;
  loginTimeDiff:string="00:00:00:00";
  logintime:any;
  constructor() {
   
  }
  
  setLoginTimeDiff(){
    let currentTime:any=new Date() ;
    let delta = Math.abs( this.logintime-currentTime ) / 1000;
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let seconds = delta % 60; 
    this.loginTimeDiff=("0" +days).slice(-2)+":"
                      +("0" +hours).slice(-2)+":"
                      +("0" +minutes).slice(-2)+":"
                      +("0" +seconds).slice(-2);
  }
  
  ngOnInit() {
    this.activeCompanyNo = globalVariables.userInfo.company_NO;
    this.activeCompanyName = globalVariables.userInfo.company_NAME;
    this.ip=globalVariables.userInfo.ip;
    this.version=globalVariables.version;
    this.empName=globalVariables.userInfo.emp_NAME;
    this.logintime=Date.parse(globalVariables.userInfo.login_time);
    this.setLoginTimeDiff();
    this.startDateTimePicking();
  }
  
  startDateTimePicking(){
    setInterval(() => {
      this.datetime = new Date();
      this.setLoginTimeDiff();
    }, 1000 *10);
  }
}
