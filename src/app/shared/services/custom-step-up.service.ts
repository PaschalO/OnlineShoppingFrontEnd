import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CustomStepUpService {
  constructor() { }
  increment(inputElement: HTMLInputElement, value: HTMLInputElement): number {
    inputElement.stepUp();
    //const _value = value.value;
	  return parseInt(value.value);
  }

  decrement(inputElement: HTMLInputElement, value: HTMLInputElement): number {
    inputElement.stepDown();
    //const _value = value.value;
    return parseInt(value.value);
  }
}
