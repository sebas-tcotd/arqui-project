import { Usuario } from '../models/usuario.model';

export interface LoadUsers {
  ok: boolean;
  usuarios: Usuario[];
  total: number;
}
