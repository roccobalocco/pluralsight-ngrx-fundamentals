import { ProductsAPIActions } from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { ProductsPageActions } from './products.action';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private router: Router
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
            map((newProduct) => ProductsAPIActions.addProductSuccess({ product: newProduct })),
            catchError((err) =>
              of(ProductsAPIActions.addProductFail({ message: err }))
            )
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      mergeMap(
        (
          { product } // permette di completare questa operazione, uccidendo tutte quelle che arrivano prima del suo completamento
        ) =>
          this.productService.update(product).pipe(
            map(() =>
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
            map(() =>
              ProductsAPIActions.deleteProductSuccess({ id })
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

  rediretToProductspage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          //si registrano le azioni che voglio ascoltare
          ProductsAPIActions.addProductSuccess,
          ProductsAPIActions.updateProductSuccess,
          ProductsAPIActions.deleteProductSuccess
        ),
        tap(() => this.router.navigate(['/products'])) //se una di quelle viene scatenata allora io mi tolgo dalla pagina
      ),
    { dispatch: false } // non voglio che questa azione venga registrata!
  );
}
