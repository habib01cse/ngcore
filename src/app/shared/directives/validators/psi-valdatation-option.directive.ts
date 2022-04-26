import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[psiValdatationOption]'
})
export class PsiValdatationOptionDirective implements OnInit {
  @Input('psiValdatationOption') validationConfig: any;
  constructor(private el: ElementRef) { console.log("PsiValdatationOptionDirective", el);
   }

   ngOnInit() {
     const parentNode = this.el.nativeElement;
     const inputValidateNodes = parentNode.querySelectorAll('input[psiVaidate]');
     const slectorValidateNodes = parentNode.querySelectorAll('select[psiVaidate]');
   }

}
