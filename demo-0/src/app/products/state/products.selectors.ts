// I nostri selettori :)

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';
import * as fromProducts from './products.reducer';

// il papá di tutti i selettori sotto
export const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  fromProducts.selectProducts
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  fromProducts.selectProductEntities
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
  selectProductsEntities,
  selectRouteParams,
  (products, { id }) => products[id]
)

// -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //
