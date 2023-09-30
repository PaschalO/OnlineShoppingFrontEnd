import { Injectable } from '@angular/core';
import { IProduct } from "../../features/pages/products/product-spec";
import { HttpClient } from "@angular/common/http";
import {map, Observable, of, pipe, tap} from "rxjs";

@Injectable({
  providedIn: 'root' // registers the service
})
export class ProductService {
  private products: IProduct[] = [];
  private readonly productUrl: string = 'https://api.escuelajs.co/api/v1/products';
  //private readonly productUrl: string = 'https://dummyjson.com/products';
  //private readonly productUrl: string = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    // cache the products instead of sending request everytime to the server to fetch products
    if (this.products.length) {
      return of(this.products);
    }

    return this.http.get<IProduct[]>(`${this.productUrl}?limit=10`).pipe(
      tap(products => this.products = products)
    )
  }

  getProduct(id: number): Observable<IProduct | null> {
    return this.getProducts().pipe(
      map((products: IProduct[]): IProduct | null => {
        const product: IProduct | undefined = products.find(product => product.id === id );
        if (product) {
          return product;
        }
        else {
          return null;
        }
      })
    )
  }
}


