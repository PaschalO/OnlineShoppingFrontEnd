import {Component} from '@angular/core';
import {CartService} from "../../../services/cart-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(public cartService: CartService, private router: Router) {}

  navigateToLoginForm() {
    this.router.navigate(['account/sign-in'])
  }
}
