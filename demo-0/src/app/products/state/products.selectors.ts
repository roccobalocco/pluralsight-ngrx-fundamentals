// I nostri selettori :)

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";

// il papá di tutti i selettori sotto
export const selectProductsState = createFeatureSelector<ProductsState>('products')

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
)

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
)

export const selectProductsShowProductsCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
)

export const selectProductsTotal = createSelector(
  selectProducts,
  sumProducts //per inferenza di nome ?
)

// -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- // -- //

