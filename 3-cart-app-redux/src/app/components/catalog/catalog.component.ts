import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';
import { ProductsState } from '../../store/products.reducer';

@Component({
    selector: 'catalog',
    imports: [ProductCardComponent],
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

  constructor(
    private store: Store<{products: ProductsState}>,
    private productService: ProductService,
    private sharingDataService: SharingDataService) {
      this.store.select('products').subscribe(state => this.products = state.products); 
  }

  ngOnInit(): void {
    this.store.dispatch(load({products: this.productService.findAll()}));
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
