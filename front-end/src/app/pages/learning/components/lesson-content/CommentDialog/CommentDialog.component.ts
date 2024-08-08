import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommentComponent } from '../../../../../components/comment/comment.component';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../../../../components/comment-editor/comment-editor.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppState } from '../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { CreateDiscuss, DeleteDiscussByAuthor, FetchingDiscusses, UpdateContentDiscuss } from '../../../../../store/discuss/discuss.actions';
import { BehaviorSubject, tap } from 'rxjs';
import { Discuss } from '../../../../../models/Discuss';
import { selectDiscussFromLessonId } from '../../../../../store/discuss/discuss.selectors';
import { Observable } from 'rxjs';
import { User } from '../../../../../models/User';

@Component({
    selector: 'learning-lesson-comment-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,


        CommentEditorComponent,
        CommentComponent,

    ],
    templateUrl: `./commentDialog.component.html`,
    styleUrl: './CommentDialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentDialogComponent implements OnInit {
    @ViewChild('commentBox') CommentBox!: ElementRef<HTMLDivElement>;

    fetched: boolean = false;


    totalComments: number = 0;
    maxLength: number = 10;
    discussList$ = new BehaviorSubject<Discuss[]>([]);
    user$: Observable<User> = this._store.select(state => state.user);



    constructor(private _dialogConfig: DynamicDialogConfig, private _store: Store<AppState>) {
    }

    ngOnInit() {
        this._store.pipe(select(selectDiscussFromLessonId(this._dialogConfig.data.lesson_id)), tap((discusses => {
            if (discusses.length <= 0 && !this.fetched) {
                this._store.dispatch(FetchingDiscusses({ lesson_id: this._dialogConfig.data.lesson_id }));
                this.fetched = true;
            }
            this.discussList$.next(discusses);
        }))).subscribe();
    }

    submitComment(comment: String) {
        const lesson_id = this._dialogConfig.data.lesson_id;
        if (lesson_id) {
            this._store.dispatch(CreateDiscuss({ discuss: { content: comment, lesson_id: lesson_id } }));
        }
    }

    onDeleteDiscuss(discuss: Discuss) {
        this._store.dispatch(DeleteDiscussByAuthor({ discuss_id: discuss._id! }));
    }

    onReportDiscuss(discuss: Discuss) {
        console.log(discuss);

    }

    onEditDiscussion(discuss: Discuss) {
        this._store.dispatch(UpdateContentDiscuss({ discuss }));
    }

    loadMoreComment() {
        this.maxLength = this.maxLength + 10;
    }

}
