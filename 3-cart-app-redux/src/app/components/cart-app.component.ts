import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartItem } from '../models/cartItem';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {


  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService,
    private router: Router) { 
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.saveSession();
        console.log("state changed");
      });
    }

  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      this.store.dispatch(add({ product: product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);
      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto añadido al carrito",
        icon: "success"
      });
    });


  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id: number) => {
      console.log(id + ' se ha ejecutado el evento IdProductEventEmitter');

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "El producto será quitado del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmo"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);
        
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha quitado el producto del carrito.",
            icon: "success"
          });
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
