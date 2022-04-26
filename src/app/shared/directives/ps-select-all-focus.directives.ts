import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: "[ps-select-all-focus]"
})

export class PsSelectAllFocusDirectives implements OnInit  {

    constructor(private el: ElementRef) { }

    @HostListener('click')
    private onClick() {        
      this.el.nativeElement.select();
    }

    @HostListener('focus')
    private onFocus() {        
      this.el.nativeElement.select();
    }

    ngOnInit() {
      
    }

    
}