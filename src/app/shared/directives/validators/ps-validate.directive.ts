import { Directive, SimpleChanges, OnChanges, OnInit, Injector, ElementRef, Input, Renderer2, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Validation } from './validation';

@Directive({
  selector: '[ps-validate]'
})
export class PsValidateDirective extends Validation implements OnChanges, OnInit {

  /** NgModel for getting changes */
  @Input("ngModel") _model: NgModel;
  @Input("ps-validate") _validationKey: string;

  public _option: any;
  
  public _mouseenter: boolean = false;
  public _div: any;
  public _tooltipDiv: any;

  constructor(
    public _injector: Injector,
    public _el: ElementRef,
    public _renderer: Renderer2,
    public _modelObj: NgModel
  ) {
    super();
    this._modelObj.control['psValidator'] = this;
    this._div = this._renderer.createElement("div");
    this._tooltipDiv = this._renderer.createElement("div");
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(_changes_: SimpleChanges): void {
    this._value = _changes_._model.currentValue;
    if (!_changes_._model.firstChange) {
      this.validator();
    }
    else {
      this.prepareValidationMsgs();
    }
  }

  public prepareValidationMsgs() {
    try {
      // Get validatoion option's object string from ***Form*** & get the object for this element
      let _validateOption_ = this._el.nativeElement.closest("form").getAttribute("ps-validation-option");
      this._option = this._injector["view"].component[_validateOption_][this._validationKey];
    } catch (error) {
      this._option = null;
    }
    this.decorateElement();
  }

  private _isUndefinedOrNull(): boolean {
    return (this._option === undefined || this._option === null);
  }

  public validator() {
    this.callValidation();

  }

  public callValidation(): any {
    // debugger;
    this._errorText = "";
    this._valid = true;
    const _element_ = this._el.nativeElement;
    if (!this._isUndefinedOrNull()) {
      if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
        if (this.isEmail(_element_) || this._option.hasOwnProperty("email")) {
          this._valid = (this._valid && this.validateEmail(this._value));
        }
        if (this._option.hasOwnProperty("size")) {
          this._valid = (this._valid && this.sizeValidator(this._option["size"]));
        }
        if (this._option.hasOwnProperty("range")) {
          this._valid = (this._valid && this.rangeValidator(this._option["range"]));
        }
        if (this._option.hasOwnProperty("pattern")) {
          this._valid = (this._valid && this.patternValidator(this._option["pattern"]));
        }
      }
      else if (this._option.hasOwnProperty("required")) {
        this._valid = (this._valid && this.requiredValidator(this._option["required"]));
      }

      if (this._option.hasOwnProperty("custom")) {
        this._valid = (this._valid && this.customValidator(this._option["custom"]));
      }

      this.setValidity();
    }
    this._result.fieldName = this._validationKey;
    this._result.isValid = this._valid;
    this._result.validationSummary = this._errorText;
    return this._result;
  }

  public psResetValidation() {
    this._valid = true;
    this.removeError();
  }

  public setValidity() {
    if (!this._valid) {
      this.setError();
    }
    else {
      this.removeError();
    }

  }

  public setError() {
    this._modelObj.control.setErrors({ 'incorrect': true });
    this.showValidationMessage();
  }

  public removeError() {
    this._modelObj.control.setErrors(null);
    this.removeValidationTooltip();
    this.removeBorder();
  }

  public showValidationMessage() {
    this.addValidationTooltip();
    this.addBorder();
  }

  public addValidationTooltip() {
    // this._el.nativeElement.previousElementSibling.getElementsByClassName("tooltip-inner")[0].innerText = this._errorText;
    this._renderer.setProperty(this._tooltipDiv, "innerText", this._errorText);
    if (this._mouseenter) this._renderer.addClass(this._div, "show");
  }

  public removeValidationTooltip() {
    this._renderer.removeClass(this._div, "show");
  }

  public addBorder() {
    this._renderer.setStyle(this._el.nativeElement, "border", "1px solid red");
  }

  public removeBorder() {
    this._renderer.removeStyle(this._el.nativeElement, "border");
  }

  public decorateElement() {

    this._renderer.addClass(this._div, "tooltip");
    this._renderer.addClass(this._div, "fade");
    this._renderer.addClass(this._div, "bs-tooltip-top");
    this._renderer.setStyle(this._div, "bottom", "34px");
    this._renderer.setStyle(this._div, "top", "initial");
    this._renderer.setStyle(this._div, "right", "0");
    this._renderer.setStyle(this._div, "pointer-events", "none");
    const _arrowDiv_ = this._renderer.createElement("div");
    this._renderer.addClass(_arrowDiv_, "arrow");
    this._renderer.setStyle(_arrowDiv_, "left", "50%");
    this._renderer.setStyle(_arrowDiv_, "transform", "translateX(-50%)");
    const _tooltipText_ = (this._errorText) ? this._errorText : this._defaultErrorText;
    this._renderer.addClass(this._tooltipDiv, "tooltip-inner");
    this._renderer.setProperty(this._tooltipDiv, "innerText", _tooltipText_);
    this._renderer.appendChild(this._div, _arrowDiv_);
    this._renderer.appendChild(this._div, this._tooltipDiv);
    this._renderer.insertBefore(this._el.nativeElement.parentNode, this._div, this._el.nativeElement);
  }

  @HostListener("mouseenter")
  showTootip() {
    this._mouseenter = true;
    if (!this._valid) {
      this._renderer.addClass(this._div, "show");
    }
  }

  @HostListener("mouseleave")
  hideTooltip() {
    this._mouseenter = false;
    this._renderer.removeClass(this._div, "show");
  }

  /** This method was written for testing purpuse only 
   *   #Result: Test passes for calling from outside
   */



}
