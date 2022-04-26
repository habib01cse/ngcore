import { Component, AfterViewInit, ViewContainerRef, OnChanges, OnInit, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    selector: '[psModal]',
    template: `
    <ng-container *ngIf="psValidateKey">
        <input #input1 ps-validate="psValidateKey" (click)="onClicked()" class="ps-modal-open-wrapper__text form-control" type="text" readonly [(ngModel)]="value">
    </ng-container>
    <ng-container *ngIf="!psValidateKey">
        <input #input2 (click)="onClicked()" class="ps-modal-open-wrapper__text form-control" type="text" readonly [(ngModel)]="value">
    </ng-container>
    <div class="ps-modal-open-wrapper__button">
      <button #button (click)="onButtonClicked($event)" type="button" class="btn btn--squire ps-modal" [disabled]="isDisabled"><i class="fa fa-folder-open-o"></i></button>
    </div>`
})
export class PsModalComponent implements OnChanges, OnInit {

    @ViewChild('button', { read: ViewContainerRef, static: true }) public button;
    @ViewChild('input1', { read: ViewContainerRef, static: false }) public input1;
    @ViewChild('input2', { read: ViewContainerRef, static: false }) public input2;
    @Input('value') value;
    @Input('isDisabled') isDisabled;
    @Input('ps-validate-key') psValidateKey;
    @Output('onModalBtnClick') _buttonClickEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {
        
    }

    ngOnChanges(changes:SimpleChanges) {
       // console.log(changes);
        
        
    }

    public onClicked() {
        if(!this.value) {
            this.psModalClick();
        } else {
            this.setFocus();
        }
    }

    public onButtonClicked(event) {
        event['psModalClose'] = this.setFocus.bind(this);
        this._buttonClickEvent.emit(event);
    }

    public psModalClick() {
        this.button.element.nativeElement.click();
    }

    setFocus() {
        const input = (this.input1)?this.input1.element.nativeElement:this.input2.element.nativeElement;
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
    }
}
