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
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { BehaviorSubject, Observable, Subscriber, Subscription, tap } from 'rxjs';
import { selectUserFromId } from '../../store/users/users.selector';
import { fromNowTimeFormat } from '../../pipe/fromNowTimeFormat';
import { CreateReplyDiscuss, DeleteReplyDiscuss, FetchReplyDiscuss, InteractReplyDiscuss, UpdateReplyDiscuss } from '../../store/reply-discuss/reply-discuss.actions';
import { CreateReplyDiscussInterface, ReplyDiscuss } from '../../models/ReplyDiscuss';
import { selectReplyDiscussFromDiscussId } from '../../store/reply-discuss/reply-discuss.selectors';
import { InteractDiscuss } from '../../store/discuss/discuss.actions';

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
    fromNowTimeFormat,
  ],
  providers: [provideIcons({ ionEllipsisHorizontalOutline, ionSendOutline })],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment!: Discuss | ReplyDiscuss;
  @Input() isAdmin: boolean = false;

  @Input() type: 'comment' | 'reply' = 'comment';

  @Input() user?: User | null;

  @Output() delete = new EventEmitter<Discuss | ReplyDiscuss>();
  @Output() edit = new EventEmitter<Discuss | ReplyDiscuss>();
  @Output() report = new EventEmitter<Discuss | ReplyDiscuss>();



  reply$: BehaviorSubject<Discuss[]> = new BehaviorSubject<ReplyDiscuss[]>([]);

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

  author$!: Observable<User | undefined>;

  replyValue: String = '';
  isReply: boolean = false;
  isEdit: boolean = false;

  loadReply: boolean = false;


  subcription: Subscription[] = [];

  constructor(private _store: Store<AppState>) {




  }

  ngOnInit(): void {

    this.author$ = this._store.select(selectUserFromId(this.comment.author_id!));

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
    else if (this.isAdmin) {
      this.items$.next([
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

    if (this.type === 'comment') {
      this._store.select(selectReplyDiscussFromDiscussId(this.comment._id!)).pipe(tap((data) => {
        if (data.fetchReplyDiscussId.length > 0) {
          this._store.dispatch(FetchReplyDiscuss({ replyDiscucssesId: data.fetchReplyDiscussId as String[] }));
        }
        if (data.replyDiscusses.length > 0) {
          this.reply$.next(data.replyDiscusses);
        }
      })).subscribe();
    }

  }

  toggleIsReply(): void {
    this.isReply = !this.isReply;
  }

  handleLoadReply(): void {
    this.loadReply = true;

  }

  toggleIsEdit(): void {
    this.isEdit = !this.isEdit;
  }

  onSubmitReply(content: String): void {
    const data: CreateReplyDiscussInterface = {
      content: content,
      discuss_id: this.comment._id!,
    }
    this._store.dispatch(CreateReplyDiscuss({ replyDiscuss: data }));
    this.isReply = false;
  }

  onSubmitEditComment(content: String): void {
    if (content != this.comment.content) {
      this.edit.emit({ ...this.comment, content: content });
    }
    this.toggleIsEdit();
  }



  onEditReply(replyDiscuss: ReplyDiscuss) {
    this._store.dispatch(UpdateReplyDiscuss({ replyDiscuss }));
  }

  onDeleteReply(replyDiscuss: ReplyDiscuss) {
    this._store.dispatch(DeleteReplyDiscuss({ replyDiscussId: replyDiscuss._id!, discuss_id: this.comment._id! }));
  }

  onInteract() {
    if (this.type === 'comment') {
      this._store.dispatch(InteractDiscuss({ discuss_id: this.comment._id! }));
    }
    if (this.type === 'reply') {
      this._store.dispatch(InteractReplyDiscuss({ replyDiscussId: this.comment._id! }));
    }
  }



  ngOnDestroy(): void {

  }
}
