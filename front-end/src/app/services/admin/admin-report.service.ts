import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../models/Report';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {

  constructor(private _http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this._http.get<Report[]>(`${environment.apiUrl}manager/report`, { withCredentials: true });
  }

  updateStatus(report_ids: string[], state: "processed" | "unprocessed"): Observable<any> {
    return this._http.patch<any>(`${environment.apiUrl}manager/report/updateStatus`, { report_ids, state }, { withCredentials: true });
  }

  deletePosts(ids: string[]): Observable<any> {
    return this._http.delete(`${environment.apiUrl}manager/report/deletemany/${JSON.stringify(ids)}`, { withCredentials: true });
  }


}
