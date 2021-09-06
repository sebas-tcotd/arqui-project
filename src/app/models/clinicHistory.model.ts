export interface ClinicHistoryResponse {
  histories: History[];
}

export interface History {
  admision_date: string;
  diagnostic: string;
  history_id: string;
  medic_name: string;
  patient_birth_date: string;
  patient_dni: string;
  patient_name: string;
  patient_number: number;
  patient_sex: string;
}
