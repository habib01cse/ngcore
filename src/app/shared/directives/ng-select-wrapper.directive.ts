import { Directive, ElementRef, HostListener, AfterViewInit, Renderer2, OnChanges, SimpleChanges, Input, HostBinding, ViewContainerRef, Injector } from '@angular/core';
import { NgModel } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgSelectComponent } from '../modules/ng-select/ng-select.component';
import * as $ from 'jquery';
import { globalVariables } from 'src/app/core/constants/globalVariables';
@Directive({
    selector: "ng-select[ngModel]",
    providers: [NgModel]
})

export class NgSelectWrapperDirective implements AfterViewInit, OnInit {
    _div;
    input;
    button;

    constructor(private ngSelectComponent:NgSelectComponent ,
        private _viewContainerRef: ViewContainerRef,
        private el: ElementRef,
        private _renderer: Renderer2,
        private model: NgModel,
        private _injector: Injector) {
        this._div = this._renderer.createElement("div");
        this.input = this._renderer.createElement("input");

    }

    @HostListener('close', ['$event']) onClose(e) {
        console.log("close event");
        this.el.nativeElement.querySelector('.ng-select-container').classList.add('ps-hidden');
        this._renderer.removeClass(this._div, "ps-hidden");
        this.setFocus();
        
    }

    @HostListener('click', ['$event']) onClick(e) {
        if(e.target.matches('input')) {
            this.onClickInput();
        } else if(e.target.matches('button') || e.target.matches('i')) {
            this.onClickButton();
        }
    }

    ngOnInit() {
        this.model.valueChanges.subscribe((event) => {
            this.loadText();
        });
        // console.log({'injector':this._injector, 'viewContainer': this._viewContainerRef});
        $.extend($.expr[':'], {
            focusable: function (el, index, selector) {
                return $(el).is('.ng-select .ps-modal-open-wrapper .form-control, .form-group .form-control, .btn:not(.ng-select .btn),.custom-control .custom-control-input');
            }
        });
       
    
    }

    ngAfterViewInit(): void {
        // console.log("el", this.el);
        // console.log("model", this.model);
        this.el.nativeElement.querySelector('.ng-select-container').classList.add('ps-hidden');

        this._renderer.addClass(this._div, "ps-modal-open-wrapper");
        // this._renderer.addClass(this._div, "ps-hidden");
        this._renderer.addClass(this.input, "ps-modal-open-wrapper__text");
        this._renderer.addClass(this.input, "form-control");
        this._renderer.setAttribute(this.input, "type", "text");
        this._renderer.setAttribute(this.input, "readonly", "true");
        this._renderer.setAttribute(this.input, "name", "INPUT_"+this.model.name);
        if( this.el.nativeElement.dataset.hasOwnProperty('tabindexText') ){
            this._renderer.setAttribute(this.input, "data-tabindex-text", this.el.nativeElement.dataset.tabindexText);
        }
        let div = this._renderer.createElement("div");
        this._renderer.addClass(div, "ps-modal-open-wrapper__button");
        this.button = this._renderer.createElement("button");
        this._renderer.addClass(this.button, "btn");
        this._renderer.addClass(this.button, "btn--squire");
        this._renderer.setAttribute(this.button, "type", "button");
        this._renderer.setAttribute(this.button, "tabindex", "-1"); // remove tabindex
        //console.log("this.button", this.button);
        let i = this._renderer.createElement("i");
        this._renderer.addClass(i, "fa");
        this._renderer.addClass(i, "fa-angle-down");
        this._renderer.appendChild(this.button, i);
        this._renderer.appendChild(div, this.button);
        this._renderer.appendChild(this._div, this.input);
        this._renderer.appendChild(this._div, div);
        this._renderer.appendChild(this.el.nativeElement, this._div);
        this._renderer.setAttribute(this.el.nativeElement.querySelector('.ng-select-container'), "tabindex", "-1");
        this._renderer.setAttribute(this.el.nativeElement.querySelector('.ng-select-container').querySelector('input'), "tabindex", "-1");
        this._renderer.setAttribute(this.el.nativeElement, "tabindex", "-1");
        
        setTimeout(() => {
            this.loadText();
        }, 100);
        
        // this._renderer.listen(this.button, 'click', () =>  this.onClickButton());
        
        // this.el.nativeElement.querySelector('.ng-select-container').setAttribute('class', 'ps-hidden');

    }

    onClickButton() {
        this._renderer.addClass(this._div, "ps-hidden");
        this.el.nativeElement.querySelector('.ng-select-container').classList.remove('ps-hidden');
        this.ngSelectComponent.open();        
    }
    onClickInput() {
        if(this.model.value) {
            this.input.select();
            return;
        };
        this._renderer.addClass(this._div, "ps-hidden");
        this.el.nativeElement.querySelector('.ng-select-container').classList.remove('ps-hidden');
        this.ngSelectComponent.open();        
    }

    private loadText() {
        if (this.model.valueAccessor['selectedItems'].length) {
            this._renderer.setAttribute(this.input, "value", this.model.valueAccessor['selectedItems'][0].label.trim());
        }
    }

    private setFocus() {
        setTimeout(() => {
            this.input.focus();
            this.input.select();
            // if(!globalVariables.isEnterPressNextFocus){
            //     return;
            // }
            var $ngSelectCanfocus = $(':focusable');
            let index;
            index = $ngSelectCanfocus.index(document.activeElement) + 1;

            //  if( $($ngSelectCanfocus.eq(index+indexIncrement).prevObject[index+indexIncrement]).hasClass('ps-modal-open-wrapper__text') ){
            //     //index = index + indexIncrement; 
            //    // console.log("inner ", index);
            //  }else{
            //     //index = index + 1;
            //     //console.log("outer ", index);
            //  }
           
            if (index >= $ngSelectCanfocus.length) index = 0;
            $ngSelectCanfocus.eq(index).focus();
            $ngSelectCanfocus.eq(index).select();
        }, 100);
    }

}