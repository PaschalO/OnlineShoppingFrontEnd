import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CustomStepUpService {
  constructor() { }
  increment(inputElement: HTMLInputElement, _input: HTMLInputElement): number {
    inputElement.stepUp();
    //const _value = value.value;
	  return parseInt(_input.value);
  }

  decrement(inputElement: HTMLInputElement, _input: HTMLInputElement): number {
    inputElement.stepDown();
    //const _value = value.value;
    return parseInt(_input.value);
  }
}
