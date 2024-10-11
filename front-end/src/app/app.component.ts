import { ChangeDetectionStrategy, Component, OnInit, isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Học Lập Trình Trực Tuyến';

  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
    if (isDevMode()) {

      console.log('Dev mode');
    }
    else {
      console.log('App mode');
    }
  }

}
