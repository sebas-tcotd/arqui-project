import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, catchError, delay } from 'rxjs/operators';
import { concat, Observable, of } from 'rxjs';

import { LoadUsers } from '../interfaces/load-users.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CookieService } from 'ngx-cookie-service';

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
    private ngZone: NgZone,
    private cookieService: CookieService
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Basic ${btoa('mauricio_administrador4:12345678!')}`,
        // Cookie: `${this.cookieService.get('csrftoken')}` || '',
      },
    };
  }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Basic ${btoa('mauricio_administrador4:12345678!')}`,
    }),
    withCredentials: true,
    observe: 'response' as 'response',
  };

  saveInLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  generateCookie(body: FormData) {}

  validateToken(): Observable<boolean> {
    return this.http.get(`${baseUrl}/login/renew`, this.headers).pipe(
      map((res: any) => {
        const { email, google, name, role, uid, img = '' } = res.user;
        this.usuario = new Usuario(name, email, '', img, google, role, uid);
        this.saveInLocalStorage(res.token, res.menu);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`http://174.138.108.150:5000/register`, formData).pipe(
      tap((res: any) => {
        this.saveInLocalStorage(res.token, res.menu);
      })
    );
  }

  updateUser(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role!,
    };

    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, this.headers);
  }

  loginUser(body: FormData) {}

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/register');
  }

  loadUsers(from: number = 0, limit: number = 5) {
    const url = `${baseUrl}/usuarios?from=${from}&limit=${limit}`;
    return this.http.get<LoadUsers>(url, this.headers).pipe(
      map((res) => {
        const users = res.usuarios.map(
          (user) =>
            new Usuario(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return { total: res.total, users };
      })
    );
  }

  deleteUser(user: Usuario) {
    const url = `${baseUrl}/usuarios/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  changeUserRole(user: Usuario) {
    return this.http.put(`${baseUrl}/usuarios/${user.uid}`, user, this.headers);
  }
}
