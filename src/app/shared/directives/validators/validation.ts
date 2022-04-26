export class Validation {
    
    public _value:any;
    public _errorText: string = "";
    public _defaultErrorText: string = "This field is required";
    public _valid: boolean = true;

    public _result = { fieldName: "", isValid: true, validationSummary: "" };


  public _getTime() { }
  public customValidatior() { }
  public setResult() { }
  public callGridValidationGrps() { }

  public isEmail(_element) {
    return _element['type'] === 'email';
  }

  public isInput(_element) {
    return _element['nodeName'] === 'INPUT' || _element['nodeName'] === 'SELECT' || _element['nodeName'] === 'TEXTAREA';
  }

  public stringMinLength(_sizeOptions_, _result_) {
    if (_sizeOptions_.hasOwnProperty("min") && (this._value.toString().length < _sizeOptions_["min"])) {
      _result_ = false;
      this._errorText = _sizeOptions_.message?_sizeOptions_.message:'Length must greater than:'+_sizeOptions_['min'];
    }
    return _result_
  }
  public stringMaxLength(_sizeOptions_, _result_) {
    if (_sizeOptions_.hasOwnProperty("max") && (this._value.toString().length > _sizeOptions_["max"])) {
      _result_ = false;
      this._errorText = _sizeOptions_.message?_sizeOptions_.message:'Length must less than:'+_sizeOptions_['max'];
    }
    return _result_
  }

  public validateEmail(_email_) {
    let _result_: boolean;
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var patt = new RegExp(re);
    _result_ = patt.test(_email_);
    if (!_result_) {
      this._errorText = "Not a valid email";
    }
    return _result_;
  }

  public sizeValidator(_sizeOptions_) {
    let _result_ = true;

    _result_ = this.stringMinLength(_sizeOptions_, _result_);
    _result_ = this.stringMaxLength(_sizeOptions_, _result_);

    return _result_;
  }

  public rangeValidator(_rangeOptions_) {
    let _result_ = true;
    let _value_ = this._value;
    try {
      if (typeof _value_ === "string") {
        _value_ = parseFloat(_value_);
      }

      const _dataRange_ = _rangeOptions_.hasOwnProperty("value")?_rangeOptions_.value:"";

      if ((typeof _value_ === "number") && (!isNaN(_value_))) {
        let range_array = _dataRange_.split(',');

        if (range_array.length === 2) {
          var minRange = parseFloat(range_array[0]);
          var maxRange = parseFloat(range_array[1]);

          if (minRange != null && _value_ < minRange) {
            this._errorText = _rangeOptions_.message?_rangeOptions_.message:'Value must greater than:'+minRange;
            return _result_ = false;
          }
          if (maxRange != null && _value_ > maxRange) {
            this._errorText = _rangeOptions_.message?_rangeOptions_.message:'Value must less than:'+maxRange;
            return _result_ = false;
          }
        }
        else {
          var range = parseFloat(_dataRange_);
          if ((typeof range === "number") && (!isNaN(range))) {
            if (_value_ < range) {
              this._errorText = _rangeOptions_.message?_rangeOptions_.message:'Value must greater than:'+range;
              _result_ = false;
            }
          }
        }
      } else {
        this._errorText = _rangeOptions_.message?_rangeOptions_.message:'';
        _result_ = false;
      }
    } catch (e) {
      this._errorText = e.message;
      _result_ = false;
    }
    return _result_;
  }

  public patternValidator(_pattern_) {
    var patt = new RegExp(_pattern_);
    return patt.test(this._value);
  }

  public customValidator(fn:Function, node?) {
    // debugger;
    return fn(node);
  }



  public requiredValidator(_requiredOptions_): boolean {
    let _result_ = true;
    if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
    }
    else {
      _result_ = false;
      this._errorText = _requiredOptions_.hasOwnProperty("message") ? _requiredOptions_.message : this._defaultErrorText;
    }
    console.log(this._value, _result_);
    
    return _result_
  }
}
