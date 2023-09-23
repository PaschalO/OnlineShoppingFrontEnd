import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import { HeaderComponent } from './header/header.component';
import {AngularMaterialModule} from "../../../angularMaterial/angularMaterial.module";
import { SearchFormComponent } from './search-form/search-form.component';
import {RouterLink} from "@angular/router";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  declarations: [ NavigationBarComponent, HeaderComponent, SearchFormComponent],
  exports: [
      HeaderComponent,
  ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterLink
    ]
})
export class HeadersModule { }
