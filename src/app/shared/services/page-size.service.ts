import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root',
 })
export class PageSizeService {
  constructor() {
  
  }

  public setPageSize(size?) {
   
    if(!size){
      size = this.getPageSize();
    }

    localStorage.setItem('pageSize', size);
    $("#customSizeCssLink").attr("href", `assets/css/size-${size}.css`);
  }  

  public getPageSize(){
    let size = localStorage.getItem('pageSize') || 'lg';

    return size;
  } 


}