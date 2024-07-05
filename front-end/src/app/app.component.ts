import { Component, OnInit, isDevMode } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap, timer } from 'rxjs';

import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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


  ngOnInit() {
    if (isDevMode()) {
      console.log('Dev mode');
    }
    else {
      console.log('App mode');
    }
  }

}
