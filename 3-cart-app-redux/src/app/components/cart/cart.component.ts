import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { total } from '../../store/items.actions';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  total: number = 0;

  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    // this.idProductEventEmitter.emit(id);
    this.sharingDataService.idProductEventEmitter.emit(id)
  }

}
