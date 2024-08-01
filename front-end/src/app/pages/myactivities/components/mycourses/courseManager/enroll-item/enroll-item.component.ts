import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { User } from '../../../../../../models/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'course-manager-enroll-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    CheckboxModule,

    FormsModule,
  ],
  templateUrl: './enroll-item.component.html',
  styleUrl: './enroll-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollItemComponent implements OnChanges {
  @Input() user!: User;
  @Input() checkAll!: Boolean;

  @Output() addCheck = new EventEmitter<String>();
  @Output() removeCheck = new EventEmitter<String>();

  isCheck: Boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkAll']) {
      this.isCheck = this.checkAll;
      if (this.isCheck) {
        this.addCheck.emit(this.user._id);
      }
      else {
        this.removeCheck.emit(this.user._id);
      }
    }
  }
  onChangeCheckBox() {
    this.isCheck = !this.isCheck;
    if (this.isCheck) {
      this.addCheck.emit(this.user._id);
    }
    else {
      this.removeCheck.emit(this.user._id);
    }
  }



}
