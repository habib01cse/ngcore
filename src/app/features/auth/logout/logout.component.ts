import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private token:WebStorageService, private router:Router) { }

  ngOnInit() {
    this.token.removeCookie();
    this.token.removeUserData();
    this.router.navigate(['login']);
  }

}
