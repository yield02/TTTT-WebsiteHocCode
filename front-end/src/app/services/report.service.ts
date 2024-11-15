import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/Report';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  report(report: Report) {
    return this.http.post<Report>(`${environment.apiUrl}report`, report, { withCredentials: true });
  }

}
