import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

const materialModules = [
	MatCardModule,
	MatButtonModule,
	MatGridListModule,
	MatDividerModule,
	MatToolbarModule,
	MatInputModule,
	MatFormFieldModule,
	MatIconModule,
	MatStepperModule,
	MatRadioModule,
	MatBadgeModule,
	MatSnackBarModule,
	MatPaginatorModule,
	MatTableModule,
	MatSortModule
];
@NgModule({
	declarations: [],
	imports: [CommonModule, ...materialModules],
	exports: [...materialModules]
})
export class AngularMaterialModule {}
