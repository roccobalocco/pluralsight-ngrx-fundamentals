import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';

import { ProductsAPIActions, ProductsPageActions } from '../state/products.action'
import { selectProducts, selectProductsLoading, selectProductsShowProductsCode, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts)
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductsCode);
  errorMessage = '';

  constructor(private productsService: ProductsService, private store: Store) {
    this.store.subscribe((store) => console.log(store))
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts());

    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(
          ProductsAPIActions.productsLoadedSuccess({ products })
        );
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode())
  }
}
