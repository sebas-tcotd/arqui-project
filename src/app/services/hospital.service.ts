import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  loadHospitals() {
    const url = `${baseUrl}/hospitales`;
    return this.http
      .get(url, this.headers)
      .pipe(map((res: any) => res.hospitales));
  }

  createHospital(name: string) {
    const url = `${baseUrl}/hospitales`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    const url = `${baseUrl}/hospitales/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string) {
    const url = `${baseUrl}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
