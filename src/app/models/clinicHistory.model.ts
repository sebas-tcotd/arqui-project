export interface ClinicHistoryResponse {
  ok: boolean;
  message: string;
  appointments: Appointment[];
}

export interface Appointment {
  _id: string;
  patientName: string;
  patientDni: string;
  patientBirthdate: string;
  patientSex: string;
  medicName: string;
  admisionDate: string;
  __v: number;
}
