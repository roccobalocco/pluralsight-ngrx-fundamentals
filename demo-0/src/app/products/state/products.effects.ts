import { ProductsAPIActions } from './products.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { catchError, concatMap, map, of } from 'rxjs';
import { ProductsPageActions } from './products.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      concatMap(() =>
        this.productService
          .getAll()
          .pipe(
            map((products) =>
              ProductsAPIActions.productsLoadedSuccess({ products })
            ),
            catchError(
              (err) => of(ProductsAPIActions.productsLoadedFail({ message: err }))
            )
          )
      )
    )
  );
}
