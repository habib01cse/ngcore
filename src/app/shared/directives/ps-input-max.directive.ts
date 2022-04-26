import { Directive, HostListener, ElementRef, Injector, EventEmitter, Output, Input, QueryList, ViewChildren, AfterViewInit, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, NgModel, NgControl } from '@angular/forms';



const _DEFAULT_RESULT = { isValid: true, validationSummaryMsgs: [] };

@Directive({
    selector: 'input:not([ps-decimal]):not([ps-number])[type=text][ngModel],textarea[ngModel]',
    providers: [NgModel],
})
export class PsInputMaxDirective implements OnInit{
    //@Input('ps-number') maxString: string;
    @Input('ngModel') _model: NgModel;
    @Input('psMax') maxString: any;

    public max = 4000;

    constructor(private _modelObj: NgModel, private el: ElementRef) {}
    ngOnInit(): void{
        if(this.maxString) {
          this.max = Number(this.maxString);
        }
      }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        if ( [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: Ctrl+C
            (event.keyCode == 67 && event.ctrlKey === true) ||
            // Allow: Ctrl+V
            (event.keyCode == 86 && event.ctrlKey === true) ||
            // Allow: Ctrl+X
            (event.keyCode == 88 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        const value = this.getValue(String(event.target.value), event.target.selectionStart, event.target.selectionEnd, String(event.key));
        
        if(value.length>this.max) {
            event.preventDefault();
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
      event.preventDefault();
    }

    @HostListener('paste', ['$event'])
    onPaste(event) {
        event.preventDefault();
        const paste = event.clipboardData.getData("text/plain");
        const value = this.getValue(String(event.target.value), event.target.selectionStart, event.target.selectionEnd, String(paste));
        if (value.length<=this.max) {
            document.execCommand("insertText", false, paste);
        }
    }

    private getValue(str, startIndex, endIndex, value) {
        return str.substring(0, startIndex)+value + str.substring(endIndex);
    }

}
