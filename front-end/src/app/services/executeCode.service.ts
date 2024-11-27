import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExecuteCodeInterface {
  language: string;
  stdin: string;
  files: { name: string, content: string }[];
}

export interface ExecuteCodeResponse {
  stdout: string;
  stderr: any;
  exception: any;
  executionTime: number;
  limitPerMonthRemaining: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExecuteCodeService {

  constructor(private _http: HttpClient) { }

  executeCode(data: ExecuteCodeInterface): Observable<any> {
    return this._http.post<any>('https://onecompiler-apis.p.rapidapi.com/api/v1/run', data, {
      headers: {
        'x-rapidapi-key': 'bb52959502msh8f3140358912854p18d671jsn399d6e07d2cd',
        'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
        'Content-Type': 'application/json'
      },

    })
  }
}
