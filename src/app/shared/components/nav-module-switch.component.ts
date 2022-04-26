import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';


@Component({
  selector: 'app-nav-module-switch',
  templateUrl: './../templates/nav-module-switch.component.html'
})
export class NavModuleSwitchComponent implements OnInit {
  @Output() moduleHide = new EventEmitter<boolean>();
  constructor(
    private storageService:WebStorageService

  ) { }

  moduleList:any=[];
  ngOnInit() {
    this.moduleList=this.storageService.getModule();
  }

  onClickModuleOverlay(){
    this.moduleHide.emit(false);
  }
}
