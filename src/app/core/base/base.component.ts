import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MasterActionService } from 'src/app/shared';

@Component({
  template: '',
})
export class BaseComponent implements OnInit, AfterViewInit {
  
  constructor(protected actionService:MasterActionService) { }
  
  ngOnInit() {}

  ngAfterViewInit(): void {
     this.actionService._checkView$.next();
  }

  

}
