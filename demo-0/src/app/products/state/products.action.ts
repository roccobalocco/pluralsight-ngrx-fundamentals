import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';
import { Update } from '@ngrx/entity';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Get Product': props<{ id: number }>(),
    'Delete Product': props<{ id: number }>(),
    'Update Product': props<{ product: Product }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    // Caricamento
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),
    // Aggiunta
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Fail': props<{ message: string }>(),
    // Ricerca
    'Get Product Success': props<{ product: Product }>(),
    'Get Product Fail': props<{ message: string }>(),
    // Cancellazione
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Fail': props<{ message: string }>(),
    // Aggiornamento
    'Update Product Success': props<{ product: Update<Product>  }>(),
    'Update Product Fail': props<{ message: string }>(),
  },
});
