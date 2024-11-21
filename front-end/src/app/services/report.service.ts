import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/Report';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private _message: MessageService) { }

  report(report: Report) {
    return this.http.post<Report>(`${environment.apiUrl}report`, report, { withCredentials: true }).pipe(tap(
      report => {
        console.log(report);
        this._message.add({ severity: 'success', summary: 'Báo cáo thành công', detail: 'Cám ơn bạn vì đã báo cáo, quản trị viên sẽ sớm duyệt báo cáo này.', key: "global" });
      }
    ))
  }
}