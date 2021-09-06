import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { ClinicHistoryResponse } from '../models/clinicHistory.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private http: HttpClient) {}

  createClinicHistory(body: any) {
    return this.http.post(
      'https://cm-sgd-histories.herokuapp.com/history',
      body
    );
  }

  loadClinicHistories() {
    return this.http
      .get<ClinicHistoryResponse>(
        'https://cm-sgd-histories.herokuapp.com/histories'
      )
      .pipe(map((res) => res.histories));
  }
}