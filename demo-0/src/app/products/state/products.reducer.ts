import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.action';
import { Product } from '../product.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';


export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => adapter.setAll([], {
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => adapter.setAll(products, {
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => adapter.setAll([], {
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.addProduct, (state, { product }) => adapter.addOne(product, {
    ...state,
    errorMessage: '',
    loading: true
  })),
  on(ProductsAPIActions.addProductSuccess, (state, { product }) => adapter.addOne(product, {
    ...state,
    loading: false,
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
  on(ProductsAPIActions.updateProductSuccess, (state, { product }) => adapter.updateOne(product, {
    ...state,
    loading: false,
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
  on(ProductsAPIActions.deleteProductSuccess, (state, { id }) => adapter.removeOne(id, {
    ...state,
    loading: false,
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

const {
  selectAll, selectEntities
} = adapter.getSelectors();

export const selectProductEntities = selectEntities
export const selectProducts = selectAll
