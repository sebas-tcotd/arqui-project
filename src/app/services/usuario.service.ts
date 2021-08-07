import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const baseUrl = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData);
  }
}
