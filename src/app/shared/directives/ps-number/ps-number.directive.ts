import { Directive, HostListener, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ps-number]',
  providers: [NgModel],
})
export class PsNumberDirective implements AfterViewInit, OnInit {
  @Input('ps-number') maxString: string;
  @Input('ngModel') _model: NgModel;
  max: number = 16;
  event: any;

  constructor(public model: NgModel, private el: ElementRef) { }

  ngOnInit(): void {
    if (this.maxString) {
      this.max = Number(this.maxString);
    }
  }

  ngAfterViewInit() {
    this.el.nativeElement.style.textAlign = 'right';
  }
  //HostListener for Keydown
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.event = event;
    this.checkDecimal();
  }

  //HostListener for paste
  @HostListener('paste', ['$event'])
  onPaste(event) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain');
    const value = this.getValue(String(event.target.value), event.target.selectionStart, event.target.selectionEnd, String(pastedInput));
    const regexStr = '^[0-9]*$';
    if (new RegExp(regexStr).test(value) && String(value).length <= this.max) {
      document.execCommand("insertText", false, pastedInput);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
  }

  private checkDecimal(): void {
    // Allow: Delete, backspace, tab, escape, enter, end, home, left, right
    if ([46, 8, 9, 27, 13, 35, 36, 37, 39].indexOf(this.event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (this.event.keyCode == 65 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+C
      (this.event.keyCode == 67 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+V
      (this.event.keyCode == 86 && this.event.ctrlKey === true) ||
      // Allow: Ctrl+X
      (this.event.keyCode == 88 && this.event.ctrlKey === true)) {
      return;
    }
    // let ch = String.fromCharCode(this.e.keyCode);
    let ch = this.event.key;

    if (!this.isCharNumeric(ch)) {
      this.event.preventDefault();
    }
    const value = this.getValue(String(this.event.target.value), this.event.target.selectionStart, this.event.target.selectionEnd, String(ch));
    if (String(value).length > this.max) {
      this.event.preventDefault();
    }
    return;
  }

  private isCharNumeric(charStr): boolean {
    return !!/\d/.test(charStr);
  }
  private getValue(str, startIndex, endIndex, value) {
    return str.substring(0, startIndex) + value + str.substring(endIndex);
  }
}
