import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemQuantityService {

  constructor() { }

  increment(inputElement: HTMLInputElement, value: HTMLInputElement): void {
    inputElement.stepUp();
    const _value = value.value;
  }

  decrement(inputElement: HTMLInputElement, value: HTMLInputElement): void {
    inputElement.stepDown();
    const _value = value.value;
  }
}
