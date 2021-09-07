import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { ClinicHistoryResponse } from '../models/clinicHistory.model';
import { DomSanitizer } from '@angular/platform-browser';

const url = 'http://143.244.212.218:5000';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  trustedUrl = this.sanitizer.sanitize(
    SecurityContext.URL,
    this.sanitizer.bypassSecurityTrustUrl(url)
  );

  createClinicHistory(body: any) {
    return this.http.post(`${this.trustedUrl}/history`, body);
  }

  loadClinicHistories() {
    return this.http
      .get<ClinicHistoryResponse>(`${this.trustedUrl}/histories`)
      .pipe(map((res) => res.histories));
  }
}
