import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable({ providedIn: 'root' })
export class UniqueCodeValidator implements AsyncValidator {
  constructor(private productService: ProductService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.productService.isProductCodeTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueCode: true } : null)),
      catchError(() => null)
    );
  }
}

@Directive({
  selector: '[appUniqueCode]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueCodeValidator),
      multi: true
    }
  ]
})
export class UniqueCodeValidatorDirective {
  constructor(private validator: UniqueCodeValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}