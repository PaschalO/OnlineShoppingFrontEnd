import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {BehaviorSubject, combineLatest, map, Observable, of} from "rxjs";
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

  addToCart(id: number | undefined, quantity: number = 1): void {
    this.cart = this.cartItems;
    // for product list add to cart button
    if (!this.cart) {
      if (id) this.cart = [ {id, quantity} ]
    }

    else {
      // if we have items in the cart and the product is not in the item, add it
      const items: ICart | undefined = this.cart.find(item => item.id === id);
      if (!items) {
        if (id) this.cart = [ ...this.cart, {id, quantity} ]
      }

      // if the product is already in the cart,
      else {
        items.quantity = items.quantity + quantity;
        //this.cart = this.cartItems
        //const items: ICart | undefined = this.cart.find(item => item.id === id);
        // if (items) {
        //   items.quantity = items.quantity + quantity;
        // }

      }
    }

    this.cartItems = this.cart;
    this.itemCount = this.totalQuantity(this.cartItems);

  }
  // for product detail component
  // incrementProductQuantity(id: number | undefined, quantity: number = 1): void {
  //   this.cart = this.cartItems;
  //
  //   if (this.cart.length < 1 ) {
  //     if (id) this.cart = [ {id, quantity} ];
  //   }
  //
  //   else {
  //     const items: ICart | undefined = this.cart.find(item => item.id === id);
  //     // we have something added to the cart
  //
  //     // step 1: if the product does not exist
  //     // step 2: if the product exist and we want to increment the quantity some amount - for product detail
  //     // step 3: if the product exists and we want to increment the quantity by 1
  //
  //     if (!items) {
  //       if (id) this.cart = [ ...this.cart, {id, quantity} ]
  //     }
  //
  //     else {
  //       if (items) {
  //         items.quantity = items.quantity + quantity;
  //       }
  //     }
  //
  //     this.cartItems = this.cart;
  //     // console.log(this.cartItems, 'add to cart 2 for this.cartItems')
  //     this.itemCount = this.totalQuantity(this.cartItems);
  //
  //   }
    // this.cart = this.cartItems;
    // //console.log(this.cart.length, 'addToCart from the cart service')
    // // check if the items are already in the cart
    // if (this.cart && this.cart.length > 0) {
    //   const product: ICart | undefined = this.cart.find(product => product.id === id);
    //   // adding more than 1 item for the specific product
    //
    //   if (product && quantity > 1) {
    //     product.quantity = quantity;
    //   }
    //
    //   // for product list add to cart component
    //   else if (product && (quantity === 1)) {
    //     product.quantity = product.quantity + 1;
    //   }
    //
    //   // for product detail add to cart component
    //   // if the product does not exist, but we have items in the cart
    //   else {
    //     if (id) this.cart = [ ...this.cart, {id, quantity} ]
    //   }
    // }
    //
    // else {
    //   // pushing new items to the cart
    //   //if (id) this.cart = [ ...this.cart, {id, quantity} ];
    //   if (id) this.cart = [ {id, quantity} ];
    // }
    //
    // this.cartItems = this.cart;
    // console.log(this.cartItems, 'add to cart 2 for this.cartItems')
    // this.itemCount = this.totalQuantity(this.cart);
  //}

  totalQuantity(cart: ICart[]): number {
    return cart.reduce((previousValue: number, currentValue: ICart) => previousValue + currentValue.quantity, 0);
  }

  removeSingleItem(id: number | undefined, quantity: number = 1): void {
    this.cart = this.cartItems;
    console.log(this.cart.length, 'removeSingleItem from the cart service')
    if (this.cart.length > 0) {
      const product: ICart | undefined = this.cart.find(product => product.id === id);

      if (product) {
        if (quantity < 1) {
          return;
        }


        product.quantity = quantity;


        // this.cart = this.cart.map(item => {
        //   if (item.id === id) {
        //     return {...item, quantity: product.quantity}
        //   } else return item;
        // });

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
