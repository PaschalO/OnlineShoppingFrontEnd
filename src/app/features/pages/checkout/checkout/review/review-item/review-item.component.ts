import { Component, Input } from "@angular/core";
import { ICart } from "../../../../../../interface/cart-interface";

@Component({
	selector: "app-review-item",
	templateUrl: "./review-item.component.html",
	styleUrls: ["./review-item.component.css"]
})
export class ReviewItemComponent {
	@Input() product!: ICart;
}
