import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPsiValidate]'
})
export class PsiValidateDirective {

  constructor(private el: ElementRef) { 
    console.log('PsiValidateDirective', el);
    
  }

}
