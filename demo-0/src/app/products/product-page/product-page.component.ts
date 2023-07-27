import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.action';
import { selectProductById } from '../state/products.selectors';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductById)

  constructor(
    private router: Router,
    private store: Store
  ) {}

  addProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }

  goToProductsPage = () => this.router.navigate(['/products']);
}
