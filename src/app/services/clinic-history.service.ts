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

  createClinicHistory(body: any) {
    const trustedUrl = this.sanitizer.sanitize(
      SecurityContext.URL,
      this.sanitizer.bypassSecurityTrustUrl(`${url}/history`)
    );

    return this.http.post(`${trustedUrl}`, body);
  }

  loadClinicHistories() {
    const trustedURL = this.sanitizer.sanitize(
      SecurityContext.URL,
      this.sanitizer.bypassSecurityTrustUrl(`${url}/histories`)
    );

    return this.http
      .get<ClinicHistoryResponse>(`${trustedURL}`)
      .pipe(map((res) => res.histories));
  }
}
