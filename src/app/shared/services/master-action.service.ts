import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterActionService {

  public _checkView$ = new Subject<void>();

  constructor() {}

  

  
}
