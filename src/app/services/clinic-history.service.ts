import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { ClinicHistoryResponse } from '../models/clinicHistory.model';

const url = 'http://143.244.212.218:5000';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private http: HttpClient) {}

  createClinicHistory(body: any) {
    return this.http.post(`${url}/history`, body);
  }

  loadClinicHistories() {
    return this.http
      .get<ClinicHistoryResponse>(`${url}/histories`)
      .pipe(map((res) => res.histories));
  }
}
