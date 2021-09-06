import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicHistoryService } from '../../services/clinic-history.service';
import { History } from '../../models/clinicHistory.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public historyClinicForm!: FormGroup;
  public clinicHistories: History[] = [];

  constructor(
    private clinicHistoryService: ClinicHistoryService,
    public modal: ModalImageService
  ) {}

  ngOnInit(): void {
    this.clinicHistoryService.loadClinicHistories().subscribe((res) => {
      this.clinicHistories = res.reverse();
    });
  }

  createHistoryForm() {
    // this.toggledForm = true;
    this.modal.openModal();
  }

  receiveForm(event: FormGroup) {
    this.historyClinicForm = event;

    this.createClinicHistory();
  }

  createClinicHistory() {
    const data: History = this.historyClinicForm.value;

    const body: FormData = new FormData();

    body.append('admision_date', data.admision_date);
    body.append('diagnostic', data.diagnostic);
    body.append('medic_name', data.medic_name);
    body.append('patient_birth_date', data.patient_birth_date);
    body.append('patient_dni', data.patient_dni);
    body.append('patient_name', data.patient_name);
    body.append('patient_number', data.patient_number.toString());
    body.append('patient_sex', data.patient_sex);

    Swal.showLoading();

    this.clinicHistoryService.createClinicHistory(body).subscribe(
      () => {
        this.clinicHistories.unshift(data);
        this.modal.closeModal();
        Swal.fire('¡Éxito!', 'Historia clínica creada.', 'success');
      },
      (err) => {
        console.error(err);
        Swal.fire(
          '¡Oh no!',
          'Ocurrió un error. Por favor, intente más tarde.',
          'error'
        );
      }
    );
  }
}
