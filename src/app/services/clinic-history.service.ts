import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ClinicHistoryResponse } from '../models/clinicHistory.model';
import { DomSanitizer } from '@angular/platform-browser';

const url = 'https://imhotep-back.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  createMedicalAppointment(body: any) {
    return this.http.post(`${url}/appointment`, body);
  }

  loadAppointments() {
    return this.http.get<ClinicHistoryResponse>(`${url}/appointment`).pipe(
      tap((res) => console.log(res)),
      map((res) => res.appointments)
    );
  }
}
