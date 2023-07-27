// I nostri selettori :)

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';
import { Product } from '../product.model';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';

// il papá di tutti i selettori sotto
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectProductsShowProductsCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProductsTotal = createSelector(
  selectProducts,
  sumProducts //per inferenza di nome ?
);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage //per inferenza di nome ?
);

export const { selectRouteParams } = getRouterSelectors()

export const selectProductById = createSelector(
  selectProducts,
  selectRouteParams,
  (products, { id }) =>
    products.find(product => product.id == id)
)

// -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //
