import { Directive, Input, ElementRef, Renderer2, HostListener } from "@angular/core";
import { ConstantPool } from "@angular/compiler";

@Directive({
  selector: '[ps-tooltip]'
})

export class ToolTipDirective {
  @Input('ps-tooltip') tooltipTitle: string;
  @Input() placement: string;
  @Input() delay: number;
  tooltip: HTMLElement;
  offset = 10;
  tooltipText: string;
  

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.el.nativeElement.innerText){
      this.tooltipText = this.el.nativeElement.innerText;
    } else if(this.el.nativeElement.value){
      this.tooltipText = this.el.nativeElement.value;
    }else{
      this.tooltipText = '';
    }

    if ( this.tooltipText ) {
      if (!this.placement) {
        this.placement = 'top'
      }
      if (!this.tooltip) { this.show(); }
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    window.setTimeout(() => {
      if (this.tooltip) {
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
      }
    }, this.delay);
  }

  create() {
    this.tooltip = this.renderer.createElement('span');
    // console.log("this.el.nativeElement.innerText",this.el.nativeElement.innerText);
    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle ? this.tooltipTitle : this.tooltipText)
    );

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {

    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();
    
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}