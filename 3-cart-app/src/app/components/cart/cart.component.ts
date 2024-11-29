import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent{

  total: number = 0;
  
  items: CartItem[] = [];
    
  constructor(private sharingDataService: SharingDataService, private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
   }

  onDeleteCart(id: number){
    // this.idProductEventEmitter.emit(id);
    this.sharingDataService.idProductEventEmitter.emit(id)
  }
  
}
