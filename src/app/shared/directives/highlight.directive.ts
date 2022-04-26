import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { DateService } from '../utility/date.service';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') highlightColor: any;

  constructor(private el: ElementRef, private dateUtil:DateService) {}
   ngOnInit(){
    this.applyConditions();
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.applyConditions();
  }
  private applyConditions(){
    if(!this.highlightColor.SALARY_NO) {
      this.highlight('#800080');
      // Copied for process: #800080
    }
    else if(this.highlightColor.SALARY_NO && this.dateUtil.isTodateFromDate(this.highlightColor.SS_CREATED_ON)) {
      this.highlight('#800000');
      // Processed Today: #800000
    }
    else if(this.highlightColor.SALARY_NO && this.highlightColor.PAID_DATE) {
      this.highlight('#28a745');
      // Paid: #400080
    }
    else {
      this.highlight('#d0a713')
      //previous processed
    }
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }

}
