import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Search } from '../interfaces/search.interface';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
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

  private _transformUsers(results: Usuario[]): Usuario[] {
    return results.map(
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
  }

  search(type: 'usuarios' | 'medicos' | 'hospitales', term: string) {
    const url = `${baseUrl}/todo/colection/${type}/${term}`;

    return this.http.get<Search>(url, this.headers).pipe(
      map((res) => {
        switch (type) {
          case 'usuarios':
            return this._transformUsers(res.resultados);
            break;

          default:
            return [];
        }
      })
    );
  }
}
