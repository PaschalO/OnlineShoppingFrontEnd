import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {BehaviorSubject, combineLatest, filter, map, Observable, of, tap} from "rxjs";
import {ICart, IProduct} from "../../features/pages/products/product-spec";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartItem = new BehaviorSubject({
    item: this.itemCount
  });

  cartCount$ = this.cartItem.asObservable();

  private cart: ICart[] = [];
  constructor(private localStorage: LocalStorageService, private productService: ProductService) {}

  get itemCount(): number {
    const itemCount = this.localStorage.getItem('item');
    return itemCount ? parseInt(itemCount, 10) : 0;
  }

  set itemCount(amount: number) {
    this.localStorage.addItem('item', amount.toString());
    this.cartItem.next({ item: amount });
  }

  // @ts-ignore
  get cartItems(): ICart[] {
    try {
      return JSON.parse(this.localStorage.getItem('cart') ?? '');
    }
    catch (e) {
      console.log(e);
    }
  }

  set cartItems(item: ICart[]) {
    try {
      this.localStorage.addItem('cart', JSON.stringify(item));
    }
    catch (e) {
      console.log(e);
    }
  }

  clearCart() {
    try {
      this.localStorage.deleteItem('item');
      this.cartItem.next({ item: 0 });
    }
    catch (e) {
      console.log(e);
    }
  }

  // for product detail component
  addToCart(id: number | undefined, quantity: number = 1): void {
    // check if the items are already in the cart
    if (this.cart.length > 0) {
      const product: ICart | undefined = this.cart.find(product => product.id === id);
      // adding more than 1 item for the specific product
      if (product && quantity > 1) {
        product.quantity = product.quantity + quantity
      }

      // adding just 1 item for the product
      else if (product && (quantity === 1)) {
        product.quantity = product.quantity + 1
      }

      else {
        if (id) this.cart = [ ...this.cart, {id, quantity} ]
      }
    }

    else {
      // pushing new items to the cart
      if (id) this.cart = [ ...this.cart, {id, quantity} ];
    }

    this.cartItems = this.cart;
    this.itemCount = this.totalQuantity(this.cart);
  }

  totalQuantity(cart: ICart[]): number {
    return cart.reduce((previousValue: number, currentValue: ICart) => previousValue + currentValue.quantity, 0);
  }

  removeSingleItem(id: number | undefined, quantity: number = 1): void {
    if (this.cart.length > 0) {
      const product: ICart | undefined = this.cart.find(product => product.id === id);

      if (product) {
        if (quantity < 1) {
          return;
        }

        this.cart = this.cart.map(item => {
          if (item.id === id) {
            return {...item, quantity: quantity}
          } else return item;
        });

        this.cartItems = this.cart;
        this.itemCount = this.totalQuantity(this.cart);
      }
    }

    else return;
  }

  removeItem(id: number | undefined): Observable<((ICart & IProduct) | null)[]> {
    const cart$ = this.showCart().pipe(
      map((items) =>
        items.filter((item) => item?.id !== id))
    )

    // remove item from local storage
    const storageCart = this.cart.filter((item) => item.id !== id)
    this.cart = [... storageCart];
    this.cartItems = this.cart;
    this.itemCount = this.totalQuantity(this.cart);

    return cart$;
  }

  showCart(): Observable<((ICart & IProduct) | null)[]>  {
    const cartItems: ICart[] = this.cartItems;
    const products: Observable<IProduct[]> = this.productService.getProducts();

    return combineLatest([of(cartItems), products]).pipe(
      map(([cartArray, productArray]) => {
        const combinedArray = cartArray.map((cartItem) => {
          const product = productArray.find(p => p.id === cartItem.id);
          if (product) {
            return {
              ...cartItem,
              ...product
            } as ICart & IProduct;
          }
          return null;
        });
        // Filter out any null values
        return combinedArray.filter(item => item !== null);
      })
    )
  }

  filterProductsFromCart(): Observable<IProduct[]> | null {
    const filterProductObservable$ =  this.showCart();

    if (filterProductObservable$) {
      return filterProductObservable$.pipe(
        map((items) => items.filter(item => item !== null) as (ICart & IProduct)[]),
        map((combinedItems) =>
          combinedItems.map(({id, title, quantity, category, description, image, in_stock, price}) => ({
            id,
            title,
            price,
            category,
            description,
            image,
            in_stock
          }))
        )
      )
    }

    else return null;
  }
}
