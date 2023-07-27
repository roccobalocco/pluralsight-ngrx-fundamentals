import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ProductsState } from "./products.reducer";
import { ProductsService } from "../products.service";
import { Product } from "../product.model";
import { exhaustMap, tap } from "rxjs";

@Injectable()
export class ProductsStore extends ComponentStore<ProductsState> {
  products$ = this.select((state) => state.products)

  constructor(private productsService: ProductsService){
    super({
      showProductCode: true,
      loading: false,
      errorMessage: '',
      products: [],
      ids: [],
      entities: {}
    })
  }

  addProducts = this.updater((state, products: Product[]) => ({
    ...state,
    products
  }))

  getProducts = this.effect<void>((trigger$) =>
    trigger$.pipe(exhaustMap(() => this.productsService.getAll().pipe(
      tap({ next: (products) => this.addProducts(products)})
    )))
  )
}
