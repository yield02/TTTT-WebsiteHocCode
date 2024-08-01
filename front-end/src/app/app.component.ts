import { Component, OnInit, isDevMode } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Học Lập Trình Trực Tuyến';


  ngOnInit() {
    if (isDevMode()) {
      console.log('Dev mode');
    }
    else {
      console.log('App mode');
    }
  }

}
