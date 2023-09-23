import { Component } from '@angular/core';
import {CartService} from "../../../services/cart-service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(public cartService: CartService) {}
}
