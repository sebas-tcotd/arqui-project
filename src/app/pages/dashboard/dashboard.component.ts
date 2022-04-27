import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicHistoryService } from '../../services/clinic-history.service';
import { Appointment } from '../../models/clinicHistory.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public historyClinicForm!: FormGroup;
  public appointments: Appointment[] = [];

  constructor(
    private clinicHistoryService: ClinicHistoryService,
    public modal: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories() {
    this.clinicHistoryService.loadAppointments().subscribe((res) => {
      this.appointments = res;
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
    console.log('create appointment:', this.historyClinicForm.value);

    const data: Appointment = this.historyClinicForm.value;

    const body = {
      admisionDate: data.admisionDate,
      medicName: data.medicName,
      patientBirthdate: data.patientBirthdate,
      patientDni: data.patientDni,
      patientName: data.patientName,
      patientSex: data.patientSex,
    };

    Swal.showLoading();

    this.clinicHistoryService.createMedicalAppointment(body).subscribe(
      (res: any) => {
        this.modal.closeModal();
        Swal.fire('¡Éxito!', `${res.message}`, 'success');
        this.loadHistories();
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
