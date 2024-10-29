import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencil, } from '@ng-icons/heroicons/outline';
import { heroTrophySolid } from '@ng-icons/heroicons/solid';
import { ionCloseSharp } from '@ng-icons/ionicons';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'study-show-question-file-item',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NgIconComponent,
    ],
    providers: [
        provideIcons({
            heroPencil,
            ionCloseSharp
        })
    ],
    templateUrl: './file-item.component.html',
    styleUrl: './file-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyFileItemComponent implements OnInit, AfterViewInit {
    @Input() name: string = '';
    @Input() index: number = 0;
    @Input() active: boolean = false;


    @Output() edit = new EventEmitter<{ name: string, index: number }>();
    @Output() onClick = new EventEmitter<number>();
    @Output() remove = new EventEmitter<number>();

    @ViewChild('nameForm') form!: FormGroup;


    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.form.valueChanges.pipe(debounceTime(800)).subscribe((value) => {
            this.editContent(value.title);
        })
    }

    clickItem() {
        this.onClick.emit(this.index);
    }

    removeItem() {
        this.remove.emit(this.index);
    }


    editContent(name: string) {
        this.edit.emit({ name, index: this.index });
    }
}
