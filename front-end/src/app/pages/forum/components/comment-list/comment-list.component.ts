import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommentComponent } from './comment/comment.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'forum-comment-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        DropdownModule,
        FormsModule,

        CommentComponent
    ],
    templateUrl: './comment-list.component.html',
    styleUrl: './comment-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {


    filter: {
        name: string;
        code: string;
    }[] | undefined;

    paginator: PageEvent = {
        first: 0,
        rows: 10,
        page: 1,
        pageCount: 10
    };

    constructor() {
        this.filter = [
            {
                name: 'mới nhất',
                code: 'desc'
            },
            {
                name: 'cũ nhất',
                code: 'asc'
            }
        ];
    }

}
