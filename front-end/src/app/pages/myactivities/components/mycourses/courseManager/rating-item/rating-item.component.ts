import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { RatingInterface } from '../../../../../../models/Rating';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { selectUserFromId } from '../../../../../../store/users/users.selector';
import { Observable } from 'rxjs';
import { User } from '../../../../../../models/User';
import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

@Component({
  selector: 'course-manager-rating-item',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    RatingModule,
    FormsModule
  ],
  templateUrl: './rating-item.component.html',
  styleUrl: './rating-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingItemComponent implements OnInit {
  @Input() rating!: RatingInterface;
  star: Number = 3;

  user$!: Observable<User | undefined>;


  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this._store.select(selectUserFromId(this.rating.author_id!));
  }
  formatTime(date: String): string {
    return formatDate(new Date(date.toString()), 'dd/MM/yyyy ', 'vi')
  }
}
