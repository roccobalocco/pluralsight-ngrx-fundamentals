import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.action';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    loading: false,
    products: [],
    errorMessage: message,
  })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(ProductsAPIActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.addProductFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(ProductsAPIActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.updateProductFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(ProductsAPIActions.deleteProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.deleteProductFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(ProductsPageActions.getProduct, (state) => ({
    ...state,
    errorMessage: '',
  })),
  on(ProductsAPIActions.getProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.getProductFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
  }))
);
