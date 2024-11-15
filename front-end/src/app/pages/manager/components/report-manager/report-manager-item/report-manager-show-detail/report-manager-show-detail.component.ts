import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Lesson } from '../../../../../../models/Lesson';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { Post } from '../../../../../../models/forum/Post';
import { selectAdminPostWithId } from '../../../../../../store/admin/post/post.selectors';
import { selectAdminCommentWithId } from '../../../../../../store/admin/comment/comment.selectors';
import { Comment } from '../../../../../../models/forum/Comment';
import { manager_updateStatusPost } from '../../../../../../store/admin/post/post.actions';
import { manager_updateStatusComments } from '../../../../../../store/admin/comment/comment.actions';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../../../../models/User';
import { selectAdminUserWithId } from '../../../../../../store/admin/users/users.selectors';
import { AvatarModule } from 'primeng/avatar';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCalendarNumberOutline } from '@ng-icons/ionicons';
import { selectAdminLessonWithId } from '../../../../../../store/admin/course/course.selectors';
import { manager_updateStatusCourses } from '../../../../../../store/admin/course/course.actions';

@Component({
    selector: 'app-report-manager-show-detail',
    standalone: true,
    imports: [
        CommonModule,
        YouTubePlayerModule,
        EditorComponent,
        ButtonModule,
        AvatarModule,
        NgIconComponent,
    ],
    providers: [provideIcons({
        ionCalendarNumberOutline
    })],
    templateUrl: './report-manager-show-detail.component.html',
    styleUrl: './report-manager-show-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportManagerShowDetailComponent {


    lesson?: Lesson | undefined;

    comment$?: Observable<Comment | undefined>;

    post$?: Observable<Post | undefined>;

    author$?: Observable<User | undefined>;

    content: String = '';

    initEditor: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        toolbar: false,
        editable_root: false,
        base_url: '/tinymce',
        suffix: '.min',
        resize: 'both',
        autoresize_on_init: true,
        plugins: ['image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
    }

    constructor(private _store: Store<AppState>, private _dynamicDialogConfig: DynamicDialogConfig, private _dynamicDialogRef: DynamicDialogRef) {

    }

    ngOnInit(): void {

        // this.lesson$ = this._dynamicDialogConfig.data.lesson;
        this.post$ = this._store.pipe(select(selectAdminPostWithId(this._dynamicDialogConfig.data.post_id))).pipe(tap(data => {
            if (data) {
                this.author$ = this._store.pipe(select(selectAdminUserWithId(data.author_id || '')));
            }
        }));
        this.comment$ = this._store.pipe(select(selectAdminCommentWithId(this._dynamicDialogConfig.data.comment_id))).pipe(tap(data => {
            if (data) {
                this.author$ = this._store.pipe(select(selectAdminUserWithId(data.author_id || '')));
            }
        }));

        this.lesson = this._dynamicDialogConfig.data.lesson_id
        if (this.lesson) {
            this.author$ = this._store.pipe(select(selectAdminUserWithId(this.lesson.author_id as string)))
        }
    }


    blockLesson() {
        this._store.dispatch(manager_updateStatusCourses({ course_ids: [this._dynamicDialogConfig.data.lesson_id.course_id], status: 'banned' }));
        this._dynamicDialogRef.close(true);
    }

    blockComment() {
        this._store.dispatch(manager_updateStatusComments({ comment_ids: [this._dynamicDialogConfig.data.comment_id], status: 'block' }));
        this._dynamicDialogRef.close(true);
    }

    blockPost() {
        this._store.dispatch(manager_updateStatusPost({ post_ids: [this._dynamicDialogConfig.data.post_id], status: 'block' }));
        this._dynamicDialogRef.close(true);
    }

    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy', 'vi');
    }
}
