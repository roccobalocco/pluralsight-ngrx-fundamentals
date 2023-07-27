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
    loading: true
  })),
  on(ProductsAPIActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
  })),
  on(ProductsAPIActions.addProductFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) =>
      existingProduct.id === product.id ? product : existingProduct
    ),
  })),
  on(ProductsAPIActions.updateProductFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter(
      (existingProduct) => existingProduct.id !== id
    ),
  })),
  on(ProductsAPIActions.deleteProductFail, (state, { message }) => ({
    ...state,
    loading: false,
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
