import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {BehaviorSubject, combineLatest, map, Observable, of, tap} from "rxjs";
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
  private products: Observable<((ICart & IProduct) | null)[]> = this.showCart();
  telus!: ((ICart & IProduct) | null)[];
  //private productItem = new BehaviorSubject(this.showCart());

  constructor(private localStorage: LocalStorageService, private productService: ProductService) {}

  get itemCount(): number {
    const itemCount = this.localStorage.getItem('item');
    return itemCount ? parseInt(itemCount, 10) : 0;
  }

  get productItem() {
    console.log(this.products, 'from the getProductItem');
    if (this.products) {
      this.products.subscribe(
          (v => this.telus = v)
      )
    }


    return this.products.pipe(
        tap(value => console.log(value))
    );
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
    // for product list add to cart-list button
    if (!this.cart) {
      if (id) this.cart = [ {id, quantity} ]
    }

    else {
      // if we have items in the cart-list and the product is not in the item, add it
      const items: ICart | undefined = this.cart.find(item => item.id === id);
      if (!items) {
        if (id) this.cart = [ ...this.cart, {id, quantity} ]
      }

      // if the product is already in the cart-list,
      else {
        items.quantity = items.quantity + quantity;
        //this.cart-list = this.cartItems
        //const items: ICart | undefined = this.cart-list.find(item => item.id === id);
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
  //   this.cart-list = this.cartItems;
  //
  //   if (this.cart-list.length < 1 ) {
  //     if (id) this.cart-list = [ {id, quantity} ];
  //   }
  //
  //   else {
  //     const items: ICart | undefined = this.cart-list.find(item => item.id === id);
  //     // we have something added to the cart-list
  //
  //     // step 1: if the product does not exist
  //     // step 2: if the product exist and we want to increment the quantity some amount - for product detail
  //     // step 3: if the product exists and we want to increment the quantity by 1
  //
  //     if (!items) {
  //       if (id) this.cart-list = [ ...this.cart-list, {id, quantity} ]
  //     }
  //
  //     else {
  //       if (items) {
  //         items.quantity = items.quantity + quantity;
  //       }
  //     }
  //
  //     this.cartItems = this.cart-list;
  //     // console.log(this.cartItems, 'add to cart-list 2 for this.cartItems')
  //     this.itemCount = this.totalQuantity(this.cartItems);
  //
  //   }
    // this.cart-list = this.cartItems;
    // //console.log(this.cart-list.length, 'addToCart from the cart-list service')
    // // check if the items are already in the cart-list
    // if (this.cart-list && this.cart-list.length > 0) {
    //   const product: ICart | undefined = this.cart-list.find(product => product.id === id);
    //   // adding more than 1 item for the specific product
    //
    //   if (product && quantity > 1) {
    //     product.quantity = quantity;
    //   }
    //
    //   // for product list add to cart-list component
    //   else if (product && (quantity === 1)) {
    //     product.quantity = product.quantity + 1;
    //   }
    //
    //   // for product detail add to cart-list component
    //   // if the product does not exist, but we have items in the cart-list
    //   else {
    //     if (id) this.cart-list = [ ...this.cart-list, {id, quantity} ]
    //   }
    // }
    //
    // else {
    //   // pushing new items to the cart-list
    //   //if (id) this.cart-list = [ ...this.cart-list, {id, quantity} ];
    //   if (id) this.cart-list = [ {id, quantity} ];
    // }
    //
    // this.cartItems = this.cart-list;
    // console.log(this.cartItems, 'add to cart-list 2 for this.cartItems')
    // this.itemCount = this.totalQuantity(this.cart-list);
  //}

  totalQuantity(cart: ICart[]): number {
    return cart.reduce((previousValue: number, currentValue: ICart) => previousValue + currentValue.quantity, 0);
  }

  removeSingleItem(id: number | undefined, quantity: number = 1): void {
    this.cart = this.cartItems;
    console.log(this.cart.length, 'removeSingleItem from the cart-list service')
    if (this.cart.length > 0) {
      const product: ICart | undefined = this.cart.find(product => product.id === id);

      if (product) {
        if (quantity < 1) {
          return;
        }


        product.quantity = quantity;


        // this.cart-list = this.cart-list.map(item => {
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
    console.log('hello world from showCart in CartService')

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

  updateProductQuantity(id: number | undefined, quantity: number) {
    //console.log(index, 'index');
    //console.log(quantity, 'quantity');
    //this.index = index;
    //this.quantity = quantity;'


    this.products = this.products.pipe(
        map((products) => {
          return products.map((product) => {
            tap(value => console.log(value))
            //console.log(i, 'index')
            if (product && product.id === id) {
              //product.quantity = quantity;
              return {...product, quantity}

              //return product;
              //
              //return {...product, quantity}
            }
            return product;
          })
        })
    )

    this.calculateGrandTotalPrice();
  }

  // calculateGrandTotalPrice() {
  //   return product.pipe(
  //       map(v=> {
  //         return v.filter((s) => s !== null).reduce((total, product) => {
  //           if (product) {
  //             return total + (product.price * product.quantity)
  //           }
  //
  //           else return total;
  //         }, 0)
  //       })
  //   )
  // }

  calculateTP() {
    return this.telus.reduce((total, product) => {
      if (product) {
        return total + (product.price * product.quantity)
      }

      else return total;
    }, 0)
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
