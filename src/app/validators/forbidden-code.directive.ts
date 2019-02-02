import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A product's code can't match the given regular expression */
export function forbiddenCodeValidator(codeRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = codeRe.test(control.value);
      return forbidden ? {'forbiddenCode': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[appForbiddenCode]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
    @Input('appForbiddenCode') forbiddenCode: string;
  
    validate(control: AbstractControl): {[key: string]: any} | null {
      return this.forbiddenCode 
        ? forbiddenCodeValidator(new RegExp(this.forbiddenCode, 'i'))(control) 
        : null;
    }
}
