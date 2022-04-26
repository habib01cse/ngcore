import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: WebStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.open(url);
  }

  hasPermission(url) {
    let urlSpliter = url.split('/');
    if (urlSpliter.length > 0) {
      let navArray = [];
      if (urlSpliter.includes("forms")
        || urlSpliter.includes("reports")
        || urlSpliter.includes("graphs")) {
          return this.storage.hasAccess(urlSpliter.pop());
      }
    }
    return true;
  }


  open(url: string): boolean {
    if (this.storage.getCookie()) {
      if (!this.hasPermission(url)) {
        this.router.navigate([this.router.url]);
        return false;
      }else{
        return true; 
      }
    }  
    
    this.router.navigate(['/login']);
    return false;
  }
}
