import {ComponentCanDeactivate} from '../can-deactivate/component-can-deactivate';
import {NgForm} from "@angular/forms";
// need to remove this class
export abstract class FormCanDeactivate extends ComponentCanDeactivate{

 abstract get form():NgForm;
 
 canDeactivate():boolean{
    //  console.log("this.form", this.form);
    //  console.log("this.form updateOn", this.form['updateOn']);
    //  console.log("this.form valueChanges", this.form.valueChanges._isScalar);
      return this.form.submitted || !this.form.dirty
  }
}