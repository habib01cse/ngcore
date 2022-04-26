import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
 })
export class PreviousRouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.pipe().subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }    

}