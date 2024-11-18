import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoice: Invoice = invoiceData;

  constructor() { }

  getInvoice(): Invoice {
    const total = this.calculateTotal();
    // Se usa spread operator para copiar el objeto invoice y agregarle la propiedad total
    return { ... this.invoice, total: total };
  }

  remove(id: number): Invoice {
    this.invoice.items = this.invoice.items.filter(item => item.id != id);
    const total = this.calculateTotal();
    return { ... this.invoice, total: total };
  }

  add(item:Item): Invoice {
    this.invoice.items = [... this.invoice.items, item];
    const total = this.calculateTotal();
    return { ... this.invoice, total: total };
  }

  calculateTotal() {
    // let total = 0;
    // this.invoice.items.forEach(item => {
    //   total += item.total();
    // });
    // return total;
    return this.invoice.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
