import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartItem } from '../models/cartItem';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {


  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      const hasItem = this.items.find(item => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      } else {
        this.items = [... this.items, { product: { ...product }, quantity: 1 }];
      }
      this.calculateTotal();
      this.saveSession();

      this.router.navigate(['/cart'],
        { state: { items: this.items, total: this.total } }
      )
      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto añadido al carrito",
        icon: "success"
      });
    });


  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
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

          this.items = this.items.filter(item => item.product.id !== id);
          if (this.items.length === 0) {
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'],
              { state: { items: this.items, total: this.total } }
            )
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha quitado el producto del carrito.",
            icon: "success"
          });
        }
      });
    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
