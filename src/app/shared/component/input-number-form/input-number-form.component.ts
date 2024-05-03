import { Component, ElementRef, ViewChild } from "@angular/core";

/**
 * Represents a component for an input number form.
 *
 * @component
 * @selector app-input-number-form
 * @templateUrl ./input-number-form.component.html
 * @styleUrls ['./input-number-form.component.css']
 */
@Component({
	selector: "app-input-number-form",
	templateUrl: "./input-number-form.component.html",
	styleUrls: ["./input-number-form.component.css"]
})
export class InputNumberFormComponent {
	value: number = 1;
	@ViewChild("numberInput", { static: true }) numberInput!: ElementRef;

	/**
	 * Increments the value of the number input element by one step.
	 *
	 * @return {void}
	 */
	increment(): void {
		this.numberInput.nativeElement.stepUp();
		this.value = this.numberInput.nativeElement.value;
	}

	/**
	 * Decrements the value of the input field by one step.
	 *
	 * @return {void}
	 */
	decrement(): void {
		this.numberInput.nativeElement.stepDown();
		this.value = this.numberInput.nativeElement.value;
	}
}
