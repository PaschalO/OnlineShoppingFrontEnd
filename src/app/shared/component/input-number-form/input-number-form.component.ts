import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
	selector: "app-input-number-form",
	templateUrl: "./input-number-form.component.html",
	styleUrls: ["./input-number-form.component.css"]
})
export class InputNumberFormComponent {
	value: number = 1;
	@ViewChild("numberInput", { static: true }) numberInput!: ElementRef;

	increment(): void {
		this.numberInput.nativeElement.stepUp();
		this.value = this.numberInput.nativeElement.value;
	}

	decrement(): void {
		this.numberInput.nativeElement.stepDown();
		this.value = this.numberInput.nativeElement.value;
	}
}
