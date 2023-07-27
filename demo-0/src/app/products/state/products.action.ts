import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product}>(),
    'Get Product': props<{ id: string}>(),
    'Delete Product': props<{ id: string }>(),
    'Update Product': props<{ product: Product }>(),
  }
})

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    //caricamento
    'Products Loaded Success': props<{ products: Product[]}>(),
    'Products Loaded Fail': props<{ message: string }>(),
    //aggiunta
    'Add Product Success': props<{ products: Product}>(),
    'Add Product Fail': props<{ message: string }>(),
    //ricerca
    'Get Product Success': props<{ products: Product}>(),
    'Get Product Fail': props<{ message: string }>(),
    //cancellazione
    'Delete Product Success': props<{ products: Product}>(),
    'Delete Product Fail': props<{ message: string }>(),
    //aggiornamento
    'Update Product Success': props<{ products: Product}>(),
    'Update Product Fail': props<{ message: string }>(),
  }
})
