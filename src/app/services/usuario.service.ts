import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

const baseUrl = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  async googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '89398295150-i5gfmgmc293t3fuqdno55lfdn2fi194c.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, google, name, role, uid, img = '' } = res.user;
          this.usuario = new Usuario(name, email, '', img, google, role, uid);
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  updateUser(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role!,
    };
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginUserWithGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
