import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.action';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {

  title: string = 'Counter usando Redux!';

  counter: number;

  constructor(private store: Store<{ counter: number }>) {
    this.counter = 0;
    this.store.select('counter').subscribe((counter) => {
      this.counter = counter;
    });
  }

  increment(): void {
    // this.counter++;
    this.store.dispatch(increment());
    console.log('incrementando...');
  }

  decrement(): void {
    // this.counter--;
    this.store.dispatch(decrement());
    console.log('decrementando...');
  }

  reset(): void {
    // this.counter = 0;
    this.store.dispatch(reset());
    console.log('reseteando...')
  }
}
