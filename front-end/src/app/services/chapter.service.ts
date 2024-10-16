import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Chapter } from '../models/Chapter';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { FetchChaptersSucess, UpdateChapter } from '../store/chapters/chapters.actions';
import { AddChapter } from '../store/mycoursemanager/mycoursemanager.actions';
import { Course } from '../models/Course';

interface createChapter {
  course_id: String;
  title: String;
}

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient, private _store: Store<AppState>) {

  }

  createChapter(data: createChapter): Observable<any> {
    return this.http.post<{ chapter: Chapter }>(`${environment.apiUrl}chapter/create`, {
      data
    }, { withCredentials: true });
  }

  getChapterList(course_id: String): Observable<Chapter[]> {
    return this.http.get<{ chapterList: Chapter[] }>(`${environment.apiUrl}chapter/${course_id}`, { withCredentials: true })
      .pipe(
        map((data) => {
          return data.chapterList;
        }),
        tap((chapterList: Chapter[]) => {
          this._store.dispatch(FetchChaptersSucess({ fetchValue: chapterList }))
        })
      );
  }

  getChaptersFromCourseId(course_id: String): Observable<Chapter[]> {
    return this.http.get<{ chapterList: Chapter[] }>(`${environment.apiUrl}chapter/${course_id}`, { withCredentials: true }).pipe(map(data => data.chapterList));
  }

  deleteChapter(course_id: String, chapter_id: String): Observable<any> {
    return this.http.delete(`${environment.apiUrl}chapter/${course_id}/${chapter_id}`, { withCredentials: true });
  }

  updateChapter(chapter_id: String, title: String): Observable<any> {
    return this.http.patch(`${environment.apiUrl}chapter/${chapter_id}`, {
      title
    }, { withCredentials: true });
  }

  sortChapter(course_id: string, chapters_id: string[]): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}chapter/sort/${course_id}`, {
      chapters_id
    }, {
      withCredentials: true,
    });
  }

}
