import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap, timer } from 'rxjs';

import { increment, decrement, reset } from './store/counter/counter.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Học Lập Trình Trực Tuyến';
  // count$: Observable<{ 'count': number }>;
  // countValue$: Observable<number>;
  // constructor(private store: Store<{ count: { 'count': number } }>) {
  //   this.count$ = store.select('count');
  //   this.countValue$ = this.count$.pipe(
  //     map(value => value.count)
  //   );
  // }


  // increment() {
  //   this.store.dispatch(increment());
  // }

  // decrement() {
  //   this.store.dispatch(decrement());
  // }

  // reset() {
  //   this.store.dispatch(reset());
  // }


}
