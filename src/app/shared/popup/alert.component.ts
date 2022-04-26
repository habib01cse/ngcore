import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, SimpleChanges, AfterViewChecked, OnChanges, AfterContentInit } from '@angular/core';
import { AlertService } from './service/alert.service';
import { LangService } from 'src/app/core/services/lang.service';
@Component({
  selector: 'ps-dialog',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
  @ViewChild('confirmationButton', { static: false }) confirmationButton:ElementRef;
  modalStatus:boolean;
  public title:string;
  public type: string;
  public body: string;
  public confirmation = false;


  public className: string;
  public color:string;

  constructor(private alertService : AlertService, private _ngZone : NgZone, public langService: LangService) { }

  ngOnInit() {
    this.alertService.alertSettings$.subscribe((data)=>{
      this.title = data.title,
      this.type = data.type,
      this.body = data.body;
      this.confirmation = data.confirmation;
      if(this.type == 'danger'){
        this.className = 'modal-confirmation--delete'
      }
      if(this.type == 'success'){
        this.className = 'modal-confirmation--success'
      }
      if(this.type == 'warning'){
        this.className = 'modal-confirmation--warning'
      }
      if(this.type == 'info'){
        this.className = 'modal-confirmation--info'
      }
      if(this.type == 'alert'){
        this.className = 'modal-alert'
      }
      this.modalStatus = true;
      setTimeout(() => {
        if(this.confirmationButton){
          this.confirmationButton.nativeElement.focus();
        }
      }, 100);
    });

  }
 
  resolve(confirmation){
    this.modalStatus = false;
    this.alertService.confirmObservable$.next(confirmation);
  }

}
