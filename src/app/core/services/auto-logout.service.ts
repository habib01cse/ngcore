import { Injectable, NgZone } from '@angular/core';
import { WebStorageService } from './web-storage.service';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BaseDataService } from './base-data.service';
import { globalVariables } from '../constants/globalVariables';

const MINUTES_UNITL_AUTO_LOGOUT = 30; // in Minutes
const CHECK_INTERVALL = 1000 // in ms
const STORE_KEY_REFRESH = 'lastRefreshAction';
const STORE_KEY_REFRESH_IS_ALIVE = 'lastRefreshAlive';
const STORE_KEY_ACTION = 'lastAction';
const STORE_KEY_TIMEOUT = 'isTimeout';
const REFESH_TIME = Math.floor(MINUTES_UNITL_AUTO_LOGOUT / 2);
const API_URL = `${globalVariables.ERP_URL.adminApiUrl}core/common/`;

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  public _isTimeOut$ = new Subject<number>();
  stopCondition: boolean = false;
  rtStopCondition: boolean = false;
  subscription: any;

  constructor(private ngZone: NgZone, private store: WebStorageService, private dataService: BaseDataService) {
    this.initListener();
  }

  get lastRefreshAction() {
    return parseInt(window.localStorage.getItem(STORE_KEY_REFRESH));
  }

  set lastRefreshAction(value) {
    window.localStorage.setItem(STORE_KEY_REFRESH, value.toString());
  }

  get isLastRefreshAlive() {
    return parseInt(window.localStorage.getItem(STORE_KEY_REFRESH_IS_ALIVE));
  }

  set isLastRefreshAlive(value) {
    window.localStorage.setItem(STORE_KEY_REFRESH_IS_ALIVE, value.toString());
  }

  get lastAction() {
    return parseInt(window.localStorage.getItem(STORE_KEY_ACTION));
  }

  set lastAction(value) {
    window.localStorage.setItem(STORE_KEY_ACTION, value.toString());
  }

  get isTimeout() {
    return parseInt(window.localStorage.getItem(STORE_KEY_TIMEOUT));
  }

  set isTimeout(value) {
    window.localStorage.setItem(STORE_KEY_TIMEOUT, value.toString());
  }

  initInterval() {
    if (this.subscription && this.subscription.isStopped === false) {
      this.stopCondition = true;
      this.rtStopCondition = true;
      this.subscription.unsubscribe();
    }
    if (!this.store.getCookie()) return;

    this.stopCondition = false;
    this.rtStopCondition = false;
    this.ngZone.runOutsideAngular(() => {
      this.subscription = interval(CHECK_INTERVALL)
        .pipe(takeWhile(() => !this.stopCondition))
        .subscribe(i => {
          this.check();
        });
    })
  }

  stopInterVal() {
    this.stopCondition = true;
    this.rtStopCondition = true;
    if (this.subscription && this.subscription.isStopped === false) {
      this.subscription.unsubscribe();
    }
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isDiffFound = diff < 0;
    this.ngZone.run(() => {
      this.setCondition(isDiffFound, this.isTimeout);
    });
    this.checkRefreshToken();
  }

  checkRefreshToken() {
    if (this.isTimeout == 1 || this.isLastRefreshAlive == 1 || !this.store.getCookie()) return;
    const itsTime = Math.round((Math.abs(Date.now() - this.lastRefreshAction) / 60000));
    if (itsTime == REFESH_TIME) {
      this.isLastRefreshAlive = 1;
      this.dataService.executeQuery(`${API_URL}refresh-token`, {}).subscribe(result => {
        this.store.saveToken(result.header.TOKEN);
        this.lastRefreshAction = Date.now();
        this.isLastRefreshAlive = 0;
      });
    }

  }

  setCondition(isDiffFound, isTimeout) {
    let result = (isDiffFound && !isTimeout) ? true : false;
    if (result) {
      this.isTimeout = 1;
      this.stopCondition = true;
      this.rtStopCondition = true;
      if (this.store.getCookie()) {
        setTimeout(() => {
          this._isTimeOut$.next(1);
        }, 100);
      } else {
        setTimeout(() => {
          this._isTimeOut$.next(0);
        }, 100);
      }
    } else {
      if (this.stopCondition) this.stopCondition = false;
    }
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('keydown', () => this.reset());
    });
  }

  reset() {
    if (this.isTimeout == 1) return;
    this.lastAction = Date.now();
    if (isNaN(this.lastRefreshAction) || (Math.abs(Date.now() - this.lastRefreshAction) / 60000) > MINUTES_UNITL_AUTO_LOGOUT) {
      this.lastRefreshAction = Date.now();
    }
  }
}
