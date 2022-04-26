import { Directive, Input, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[ps-slide-hide-show]',
})
export class SlideHideShowDirective implements OnInit {

  @Input('ps-slide-hide-show')
  private psSlideHideShow: string;

  private targetElement: string;
  private targetHide: string;
  private component;
  private selectedTarget;

  constructor(private el: ElementRef, private viewContainer: ViewContainerRef) {

  }

  ngOnInit() {
    let splitedList = this.psSlideHideShow.split(',');
    if (splitedList.length > 0) {
      this.targetElement = splitedList[0];
      this.targetHide = (splitedList.hasOwnProperty(1)) ? splitedList[1] : null;
      this.targetHide = this.targetHide.trim();
      this.selectedTarget = $("div[data-ps-target=" + this.targetElement + "]");
      if (this.selectedTarget.length == 0) {
        this.selectedTarget = $("div[ps-target=" + this.targetElement + "]");
      }
      this.component = this.viewContainer['_view'].component;
    }
    if (this.component[this.targetHide]) {
      this.selectedTarget.slideToggle(0);
    }
  }
  @HostListener('click') onClick() {
    if (this.targetHide) {
      this.component[this.targetHide] = !this.component[this.targetHide];
    }
    this.selectedTarget.slideToggle(150);
  }
}
