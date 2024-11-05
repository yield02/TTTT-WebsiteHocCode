import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoursesComponent } from '../../../components/courses/courses.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Subject } from '../../../models/Subject';
import { BehaviorSubject, debounceTime, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { fetchingSubjects } from '../../../store/subjects/subjects.actions';
import { StudyHomeLearningItemComponent } from './study-home-learning-item/study-home-learning-item.component';
import { LearningInterFace } from '../../../models/Learning';
import { fetchLearnings } from '../../../store/learning/learning.actions';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FetchingCoursesFromSubjectIds } from '../../../store/courses/courses.actions';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { Course } from '../../../models/Course';
import { StudyHomeCourseComponent } from './study-home-course/study-home-course.component';
import { selectCourseWithFilter } from '../../../store/courses/courses.selector';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CoursesComponent,
        ButtonModule,
        DropdownModule,
        ReactiveFormsModule,
        NgIconComponent,
        OverlayPanelModule,
        DropdownModule,
        PaginatorModule,

        StudyHomeLearningItemComponent,
        StudyHomeCourseComponent,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('search') searchRef!: ElementRef;

    paginator: PageEvent = {
        first: 0,
        rows: 12,
        page: 0,
        pageCount: 0,
        total: 100
    }


    searchBehavior$: BehaviorSubject<{ search: string, subject: string, filter: { type: 'asc' | 'desc', field: any } }> = new BehaviorSubject<{ search: string, subject: string, filter: { type: 'asc' | 'desc', field: any } }>({
        search: '',
        subject: 'all',
        filter: {
            type: 'desc',
            field: ['averageRating', 'enroll.length', 'createdAt']
        }
    });

    filterCourse = {
        search: '',
        subject: 'all',
        filter: {
            type: 'asc',
            field: 'createTime'
        }
    }

    fetchedSubject: Boolean = false;
    fetchedLearning: boolean = false;

    learnings$!: Observable<{ [key: string]: LearningInterFace }>;


    typeSubjects: {
        _id: string,
        title: string
    }[] = [{
        _id: 'all',
        title: 'Tất cả'
    }];

    typeSubject: FormControl = new FormControl('all');
    searchCourse: FormControl = new FormControl('');

    isSearching: boolean = false;


    subjects: Subject[] = [];
    courses: Course[] = [];

    // lọc createTime/member/averageRating



    subscriptions: Subscription[] = [];

    constructor(private _store: Store<AppState>, private _changeDetector: ChangeDetectorRef) {

    }
    ngOnInit(): void {
        this.subscriptions.push(this._store.select(state => state.subjects).pipe(tap(subjects => {
            if (!this.fetchedSubject) {
                this._store.dispatch(fetchingSubjects());  // dispatch action to fetch subjects from api.
                this.fetchedSubject = true;
            }
            this.typeSubjects = [{
                _id: 'all',
                title: 'Tất cả'
            }, ...subjects.map(subject => {
                return {
                    _id: subject._id as string,
                    title: subject.title as string,
                }
            })];
            this.subjects = subjects || [];  // update subjects to component.
        })).subscribe(value => {
            if (value.length > 0) {
                this.fetchCoursesFromSubjectIds('all');
            }
        }));

        this.learnings$ = this._store.select(state => state.learning).pipe(tap(learning => {
            if (!this.fetchedLearning) {
                this._store.dispatch(fetchLearnings());
                this.fetchedLearning = true;
            }
        }));


        this.subscriptions.push(this.typeSubject.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
            this.fetchCoursesFromSubjectIds(value);
            this.searchBehavior$.next({
                ...this.searchBehavior$.getValue(),
                subject: value,
            })
        }));

        this.subscriptions.push(this.searchCourse.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
            this.searchBehavior$.next({
                ...this.searchBehavior$.getValue(),
                search: value,
            })
        }))

        this.subscriptions.push(this.searchBehavior$.pipe(switchMap(filter => {
            return this._store.pipe(select(selectCourseWithFilter(filter)));
        })).subscribe(value => {
            this.courses = value;
            this.paginator.total = value.length;
            this.paginator.pageCount = Math.ceil(value.length / this.paginator.rows);
            this._changeDetector.detectChanges();
        }));

    }

    // close search when click outside of search input.
    @HostListener('document:click', ['$event'])
    onGlabalClick(event: MouseEvent) {
        if (!this.searchRef.nativeElement.contains(event.target as Node)) {
            this.isSearching = false;
        }
    }



    calculateLengthOfLearnings(learnings: { [key: string]: LearningInterFace }) {
        return Object.keys(learnings).length;
    }

    fetchCoursesFromSubjectIds(value: string) {
        let subjectsId = [];
        if (value == 'all') {
            subjectsId = this.subjects.map(subject => subject._id);
        }
        else {
            subjectsId = [value];
        }
        this._store.dispatch(FetchingCoursesFromSubjectIds({ subject_ids: subjectsId as string[] }));
    }

    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {
        this.searchBehavior$.next({
            ...this.searchBehavior$.getValue(),
            filter: {
                type: this.searchBehavior$.getValue().filter.type,
                field: event.value
            }
        });
    }

    typeFilterChange(event: any) {
        this.searchBehavior$.next({
            ...this.searchBehavior$.getValue(),
            filter: {
                type: event.value,
                field: this.searchBehavior$.getValue().filter.field
            }
        });
    }

    onPageChange(event: any) {
        this.paginator = {
            ...this.paginator,
            page: event.page,
            first: event.first,
            pageCount: event.pageCount,
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
