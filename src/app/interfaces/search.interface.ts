import { Usuario } from '../models/usuario.model';
export interface Search {
  ok: boolean;
  resultados: Usuario[] /* TODO: próximamente añadir para que sea de Médicos y Hospitales */;
}
