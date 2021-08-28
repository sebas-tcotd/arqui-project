import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const baseUrl = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  loadMedics() {
    const url = `${baseUrl}/medicos`;
    return this.http
      .get(url, this.headers)
      .pipe(map((res: any) => res.medicos));
  }

  getMedicById(id: string) {
    const url = `${baseUrl}/medicos/${id}`;

    return this.http.get(url, this.headers).pipe(map((res: any) => res.medico));
  }

  createMedic(medic: Medico) {
    const url = `${baseUrl}/medicos`;
    return this.http.post(url, medic, this.headers);
  }

  updateMedic(medic: Medico) {
    const url = `${baseUrl}/medicos/${medic._id}`;
    return this.http.put(url, medic, this.headers);
  }

  deleteMedic(medicId: string) {
    const url = `${baseUrl}/medicos/${medicId}`;
    return this.http.delete(url, this.headers);
  }
}
