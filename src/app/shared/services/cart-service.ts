import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {BehaviorSubject} from "rxjs";
import {ICart, IProduct} from "../../features/pages/products/product-spec";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  // pushes the total quantity to the consumers that needs it
  private cartItem = new BehaviorSubject({
    item: this.itemCount
  });

  public cartCount$ = this.cartItem.asObservable();

  private cart: ICart[] = [];

  constructor(private localStorage: LocalStorageService, private productService: ProductService) {
  }

  get itemCount(): number {
    const itemCount = this.localStorage.getItem('item');
    return itemCount ? parseInt(itemCount, 10) : 0;
  }

  set itemCount(amount: number) {
    this.localStorage.addItem('item', amount.toString());
    this.cartItem.next({item: amount});
  }

  // get cart array from localStorage
  // @ts-ignore
  get cartItems(): ICart[] {
    try {
      return JSON.parse(this.localStorage.getItem('cart') ?? '');
    } catch (e) {
      console.log(e);
    }
  }

  // set cart array in localStorage
  set cartItems(item: ICart[]) {
    try {
      this.localStorage.addItem('cart', JSON.stringify(item));
    } catch (e) {
      console.log(e);
    }
  }

  // clear cart from storage and reset the total quantity to 0
  clearCart() {
    try {
      this.localStorage.deleteItem('item');
      this.cartItem.next({item: 0});
    } catch (e) {
      console.log(e);
    }
  }

  addToCart(product: IProduct, quantity: number = 1): void {
    const foundProduct = this.cart.find(items => items.id === product.id);

    if (foundProduct) {
      foundProduct.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        id: product.id,
        quantity: quantity
      })
    }
    this.cartItems = this.cart;
    this.itemCount = this.calculateTotalQuantity();
  }

  reduceItemQuantityFromCart(product: IProduct): void {
    this.cart = this.cartItems;
    const foundProduct = this.cart.find(items => items.id === product.id);

    if (foundProduct && foundProduct.quantity > 1) {
      foundProduct.quantity = foundProduct.quantity - 1;
      this.cartItems = this.cart;
      this.itemCount = this.calculateTotalQuantity();

    } else {
      return;
    }
  }

  removeProductFromCart(id: number | undefined): ICart[] {
    this.cart = this.cartItems;

    if (id) {
      this.cart = this.cart.filter(items => items.id !== id)
      this.cartItems = this.cart;
      this.itemCount = this.calculateTotalQuantity();
    }

    return this.cartItems;
  }

  // calculate the totalQuantity in a cart
  calculateTotalQuantity(): number {
    return this.cartItems.reduce((previousValue: number, currentValue: ICart) => previousValue + currentValue.quantity, 0);
  }

  calculateGrandTotalPrice(): number {
    this.cart = this.cartItems;
    return this.cart.reduce((previousValue: number, currentValue) => {
      return previousValue + (currentValue.price * currentValue.quantity)
    }, 0)
  }

  displayItemsInCart(): ICart[] | null {
    const cart = this.cartItems;

    if (cart) {
      return cart;
    } else {
      return null;
    }
  }
}
