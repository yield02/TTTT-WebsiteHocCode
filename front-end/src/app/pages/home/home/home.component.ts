import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoursesComponent } from '../../../components/courses/courses.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { Subject } from '../../../models/Subject';
import { Observable, tap } from 'rxjs';
import { fetchingSubjects } from '../../../store/subjects/subjects.actions';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule, CoursesComponent],
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

    fetched: Boolean = false;
    subjects!: Observable<Subject[]>;

    constructor(private _store: Store<AppState>) {

    }
    ngOnInit(): void {
        // this.subjects = this._store.select(state => state.subjects).pipe(tap(subjects => {
        //     if (!this.fetched) {
        //         this._store.dispatch(fetchingSubjects());  // dispatch action to fetch subjects from api.
        //         this.fetched = true;
        //     }
        // }));
    }
}
