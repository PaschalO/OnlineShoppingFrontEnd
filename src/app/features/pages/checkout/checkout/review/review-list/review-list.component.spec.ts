import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewListComponent } from "./review-list.component";

describe("ReviewListComponent", () => {
	let component: ReviewListComponent;
	let fixture: ComponentFixture<ReviewListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ReviewListComponent]
		});
		fixture = TestBed.createComponent(ReviewListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
