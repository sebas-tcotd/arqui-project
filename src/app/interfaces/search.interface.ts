import { Usuario } from '../models/usuario.model';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';
export interface Search {
  ok: boolean;
  resultados:
    | Usuario[]
    | Medico[]
    | Hospital[] /* TODO: próximamente añadir para que sea de Médicos y Hospitales */;
}
