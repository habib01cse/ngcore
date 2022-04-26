import { Directive, HostListener, Input, OnChanges, SimpleChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Directive({
  selector: '[ps-decimal]',
  providers: [NgModel],
})
export class PSDecimalPrecisionDirective implements OnInit, AfterViewInit {
  @Input('ps-decimal') delimiter: string;
  @Input('ngModel') _model: NgModel;
  max: number = 14;
  precision: number = globalVariables.psDecimalPrecision;

  regexStr;
  event: any;
  

  constructor(public model: NgModel, private el: ElementRef) { }

  ngOnInit(): void {
    if (this.delimiter) {
      if ((this.delimiter.indexOf(',') > -1) && (this.delimiter.split(',').length === 2)) {
        const delArr = this.delimiter.split(',');
        this.precision = Number(delArr[1]);
        this.max = Number(delArr[0]) - this.precision;
      } else {
        this.precision = Number(this.delimiter);
      }
    }
    this.regexStr = '^[0-9]+(\.[0-9]{0,' + this.precision + '})?$';
  }

  ngAfterViewInit() {
    this.el.nativeElement.style.textAlign = 'right';
    
  }

  //HostListener for Keydown
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.event = event;
    this.checkDecimal();
  }

  private checkDecimal(): void {
    if ([46, 8, 9, 27, 13].indexOf(this.event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (this.event.keyCode == 65 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+C
      (this.event.keyCode == 67 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+V
      (this.event.keyCode == 86 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+X
      (this.event.keyCode == 88 && this.event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (this.event.keyCode >= 35 && this.event.keyCode <= 39)) {
      return;
    }
    // check period or decimal point
    let ch = this.event.key;
    if (this.isCharNumeric(ch) || this.event.keyCode === 190 || this.event.keyCode === 110) {
      var s: string = '';
      var i: number;
      const value = this.getValue(String(this.event.target.value), this.event.target.selectionStart, this.event.target.selectionEnd, String(ch));

      let regEx = new RegExp(this.regexStr);

      if (!regEx.test(value)) {
        this.event.preventDefault();
      }
      if (value.indexOf('.') > -1) {
        if (value.split('.')[0].length > this.max || value.split('.')[1].length > this.precision) {
          this.event.preventDefault();
        }
      } else {
        if (value.length > this.max) {
          this.event.preventDefault();
        }
      }

      // if (String(this.model.model).includes('.')) {
      //   this.e.preventDefault();
      // }
    } else {
      this.event.preventDefault();
    }

  }
  //HostListener for OnBlur
  @HostListener('focusout', ['$event']) onBlur(event) {
    if (this.precision) {

      if (event.keyCode == 8 || event.keyCode == 9) {
        return;
      }
      else if ((event.target.value == '') || (event.target.value == 'NaN') || (event.target.value == "") ) {
        console.log("event.target.value", event.target.value);
        return;
      }
      else if (event.target.value == '.') {
        this.model.valueAccessor.writeValue('');
        return;
      }
      setTimeout(() => {
        if(isNaN(parseFloat(parseFloat("" + event.target.value + "").toFixed(Number(this.precision))))){
          this.model.update.emit("")
        }else{
          this.model.update.emit(parseFloat(parseFloat("" + event.target.value + "").toFixed(Number(this.precision))));
        }
      }, 100)
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
  }

  //HostListener for paste
  @HostListener('paste', ['$event'])
  onPaste(event) {
    event.preventDefault();
    this.event = event;
    const paste = event.clipboardData.getData("text/plain");
    const value = this.getValue(String(this.event.target.value), this.event.target.selectionStart, this.event.target.selectionEnd, String(paste));
    let regEx = new RegExp(this.regexStr);

    if (!regEx.test(value)) {
      return;
    }
    if (value.indexOf('.') > -1) {
      if (value.split('.')[0].length > this.max || value.split('.')[1].length > this.precision) {
        return;
      }
    } else {
      if (value.length > this.max) {
        return;
      }
    }
    document.execCommand("insertText", false, paste);
  }


  private isCharNumeric(charStr): boolean {
    return !!/\d/.test(charStr);
  }

  private getValue(str, startIndex, endIndex, value) {
    return str.substring(0, startIndex) + value + str.substring(endIndex);
  }
}
