import { ProductsAPIActions } from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { ProductsPageActions } from './products.action';
import { Product } from '../product.model';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        this.productService.getAll().pipe(
          map((products) =>
            ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError((err) =>
            of(ProductsAPIActions.productsLoadedFail({ message: err }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(
        (
          { product } // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        ) =>
          this.productService.add(product).pipe(
            map((product) => ProductsAPIActions.addProductSuccess({ product })),
            catchError((err) =>
              of(ProductsAPIActions.addProductFail({ message: err }))
            )
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(
        (
          { product } // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        ) =>
          this.productService.update(product).pipe(
            map((product) =>
              ProductsAPIActions.updateProductSuccess({ product })
            ),
            catchError((err) =>
              of(ProductsAPIActions.updateProductFail({ message: err }))
            )
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(
        (
          { id } // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        ) =>
          this.productService.delete(id).pipe(
            map((product: any) =>
              ProductsAPIActions.deleteProductSuccess({ product })
            ),
            catchError((err) =>
              of(ProductsAPIActions.deleteProductFail({ message: err }))
            )
          )
      )
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.getProduct),
      mergeMap(
        (
          { id } // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        ) =>
          this.productService.getById(id).pipe(
            map((product) => ProductsAPIActions.getProductSuccess({ product })),
            catchError((err) =>
              of(ProductsAPIActions.getProductFail({ message: err }))
            )
          )
      )
    )
  );
}
