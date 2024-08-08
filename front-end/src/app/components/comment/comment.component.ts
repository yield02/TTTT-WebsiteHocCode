import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEllipsisHorizontalOutline, ionSendOutline } from '@ng-icons/ionicons';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpeedDialModule } from 'primeng/speeddial';
import { Discuss } from '../../models/Discuss';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { BehaviorSubject, Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    NgIconComponent,
    InputTextareaModule,
    FormsModule,
    SpeedDialModule,

    CommentEditorComponent,
  ],
  providers: [provideIcons({ ionEllipsisHorizontalOutline, ionSendOutline })],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment!: Discuss;
  @Input() user?: User | null;

  @Output() delete = new EventEmitter<Discuss>();
  @Output() edit = new EventEmitter<Discuss>();
  @Output() report = new EventEmitter<Discuss>();

  items$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([
    {
      icon: 'pi pi-flag',
      tooltipOptions: {
        tooltipLabel: 'Báo cáo',
        tooltipPosition: 'left'
      },
      command: () => {
        this.report.emit(this.comment);
      }
    },

  ]);
  replyValue: String = '';
  isReply: boolean = false;
  isEdit: boolean = false;


  subcription: Subscription[] = [];

  constructor(private _store: Store<AppState>) {




  }

  ngOnInit(): void {
    if (this.user?._id == this.comment?.author_id) {
      this.items$.next([
        {
          tooltipOptions: {
            tooltipLabel: 'Chỉnh sửa',
            tooltipPosition: 'left'
          },
          icon: 'pi pi-pencil',
          command: () => {
            this.toggleIsEdit();
          }
        },
        {
          tooltipOptions: {
            tooltipLabel: 'Xóa',
            tooltipPosition: 'left'
          },
          icon: 'pi pi-trash',
          command: () => {
            this.delete.emit(this.comment);
          }
        },
        {
          icon: 'pi pi-flag',
          tooltipOptions: {
            tooltipLabel: 'Báo cáo',
            tooltipPosition: 'left'
          },
          command: () => {
            this.report.emit(this.comment);
          }
        },

      ])
    }

  }

  toggleIsReply(): void {
    this.isReply = !this.isReply;
  }

  toggleIsEdit(): void {
    this.isEdit = !this.isEdit;
  }

  onSubmitEditComment(content: String): void {
    if (content != this.comment.content) {
      this.edit.emit({ ...this.comment, content: content });
    }
    this.toggleIsEdit();
  }

  ngOnDestroy(): void {

  }
}
