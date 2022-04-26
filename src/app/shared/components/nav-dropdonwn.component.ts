import { Component, OnInit, ViewChild, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Nav } from '../models/nav';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { NavSwitchComponent } from './nav-switch.component';
import { forkJoin } from 'rxjs';
import { NavService } from '../services/nav.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nav-dropdonwn',
  templateUrl: './../templates/nav-dropdonwn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDropdonwnComponent implements OnInit {
  child: NavSwitchComponent;
  navArray: Array<Nav> = [];
  nav: Nav;
  public routerArr;
  constructor(
    private storage: WebStorageService,
    private sideNavs: NavService,
    private router: Router,
    private location: Location,
    private zone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     ref.detach();
    //     this.routerArr = event.url.split('/')[2];
    //     this.nav = this.navArray[this.getNavIndex(this.routerArr)];
    //     if(this.ref){
    //       this.ref.detectChanges();
    //     }
        
    //     this.child.loadClickEvent(this.nav);
    //   }
    // });
    this.routerArr = this.router.url.split('/')[2];
  }

  getNavIndex(type) {
    return type == 'reports' ? 1 : 0;
  }

  ngOnInit() {

  }

  createNav(child: NavSwitchComponent) {
    // console.log("this.routerArr", this.routerArr);
    // console.log("this.routerArr", this.routerArr);
    this.child = child;
    this.navArray.push(new Nav('Forms', this.storage.getMenu('MENU_F')));
    this.navArray.push(new Nav('Reports', this.storage.getMenu('MENU_P')));
    this.navArray.push(new Nav('Graphs', this.storage.getMenu('MENU_G')));
   // this.ref.detach();
    this.nav = this.navArray[this.getNavIndex(this.routerArr)];
   // console.log("this.nav", this.nav);
   // this.ref.detectChanges();
    this.child.loadClickEvent(this.nav);
  }

  getValue(event, index) {
    event.stopPropagation();
    event.preventDefault();
    //this.ref.detach();
    this.nav = this.navArray[index];
    //this.ref.detectChanges();
    this.child.loadClickEvent(this.nav);
    
  }

}
