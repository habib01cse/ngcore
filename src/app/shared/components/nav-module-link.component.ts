import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
  selector: 'app-nav-module-link',
  templateUrl: './../templates/nav-module-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavModuleLinkComponent implements OnInit {
  linkStr: string = '/home';
  moduleName:string = ''

  constructor(private router: Router) { }

  ngOnInit() {    
    const routerArr = this.router.url.split('/');
    if(routerArr.length<1) return;
    let module = routerArr[1];
    if(module === "load") {
      if(routerArr.length < 5) {return;}
      else {module = routerArr[3];}
    }
    if(Object.keys(globalVariables.ERP_MODULES).indexOf((module).toUpperCase()) <0) return;
    const moduleObj = globalVariables.ERP_MODULES[(module).toUpperCase()];
    this.moduleName = moduleObj.fullName;
    this.linkStr = moduleObj.link;


  }

}
