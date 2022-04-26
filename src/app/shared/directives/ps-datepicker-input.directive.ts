import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Provider,
  Renderer2,
  HostListener
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {
  formatDate,
  getLocale,
  isAfter,
  isBefore,
  isDate,
  isDateValid,
  parseDate,
  utcAsLocal
} from 'ngx-bootstrap/chronos';
import { BsLocaleService } from '../vendor';
import { PsDatepickerDirective } from './ps-datepicker.directive';


const BS_DATEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => PsDatepickerInputDirective),
  multi: true
};

const BS_DATEPICKER_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => PsDatepickerInputDirective),
  multi: true
};

@Directive({
  selector: `input[psDatepicker]`,
  host: {
    '(change)': 'onChange($event)',
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()'
  },
  providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR]
})
export class PsDatepickerInputDirective
  implements ControlValueAccessor, Validator {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  /* tslint:disable-next-line: no-unused-variable */
  private _validatorChange = Function.prototype;
  private _value: Date;

  public event;

  constructor(@Host() private _picker: PsDatepickerDirective,
    private _localeService: BsLocaleService,
    private _renderer: Renderer2,
    private _elRef: ElementRef,
    private changeDetection: ChangeDetectorRef) {
    // update input value on datepicker value update
    this._picker.bsValueChange.subscribe((value: Date) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    });

    // update input value on locale change
    this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    });
  }
  //HostListener for Keydown
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.event = event;
    this.checkDecimal();
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

    if (!this.isCharNumeric(ch) && ch != '/') {
      this.event.preventDefault();
    }
    //console.log("this._value", this._value);
    
    return;
  }

  private isCharNumeric(charStr): boolean {
    return !!/\d/.test(charStr);
  }


  _setInputValue(value: Date): void {
    const initialDate = !value ? ''
      : formatDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);

    this._renderer.setProperty(this._elRef.nativeElement, 'value', initialDate);
  }

  onChange(event: Event) {
    /* tslint:disable-next-line: no-any*/
    this.writeValue((event.target as any).value);
    this._onChange(this._value);
    this._onTouched();
    //console.log("changed",this._value );
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const _value: Date | string = c.value;

    /* tslint:disable-next-line: prefer-switch */
    if (_value === null || _value === undefined || _value === '') {
      return null;
    }

    if (isDate(_value)) {
      const _isDateValid = isDateValid(_value);
      if (!_isDateValid) {
        return { bsDate: { invalid: _value } };
      }

      if (this._picker && this._picker.minDate && isBefore(_value, this._picker.minDate, 'date')) {
        return { bsDate: { minDate: this._picker.minDate } };
      }

      if (this._picker && this._picker.maxDate && isAfter(_value, this._picker.maxDate, 'date')) {
        return { bsDate: { maxDate: this._picker.maxDate } };
      }
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorChange = fn;
  }

  writeValue(value: Date | string) {
    if (!value) {
      this._value = null;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(
          `Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`
        );
      }

      this._value = parseDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
    }

    this._picker.bsValue = this._value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._picker.isDisabled = isDisabled;
    if (isDisabled) {
      this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');

      return;
    }
    this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  onBlur() {
    this._onTouched();
  }

  hide() {
    this._picker.hide();
    this._renderer.selectRootElement(this._elRef.nativeElement).blur();
  }
}
