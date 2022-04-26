import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: "[ps-select-all]"
})

export class PsSelectAllDirectives {

    constructor(private el: ElementRef) { }

    @HostListener('click')
    private onClick() {        
        this.el.nativeElement.select();
    }
}