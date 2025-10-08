import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }
  Summary= $localize`validation error`;
  minlenthError=$localize`must be at least 3 chars`;
  minlenthForPassError=$localize`must be at least 4 chars`;
  requiredError = $localize`this field is required`;
  passNoMatchError = $localize`rePassword not match password`;
  EmailError = $localize`email not valid`;
  charsOnly = $localize`chars only`;

}
