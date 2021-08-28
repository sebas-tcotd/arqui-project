import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public $imgSubscription!: Subscription;
  public loading: boolean = true;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.$imgSubscription = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadHospitals());
  }

  ngOnDestroy() {
    if (this.modalImageService.newImage.closed) {
      this.$imgSubscription.unsubscribe();
    }
  }

  search(term: string) {
    if (term.length === 0) return this.loadHospitals();

    return this.searchesService
      .search('hospitales', term)
      .subscribe((res) => (this.hospitals = res as Hospital[]));
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id as string, hospital.name)
      .subscribe(() => {
        Swal.fire('Actualizado', `${hospital.name}.`, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService
      .deleteHospital(hospital._id as string)
      .subscribe(() => {
        this.loadHospitals();
        Swal.fire(
          'Eliminado',
          `Se eliminó <strong>${hospital.name}</strong>.`,
          'success'
        );
      });
  }

  async openAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
    });

    if (value?.trim().length) {
      this.hospitalService
        .createHospital(value as string)
        .subscribe((res: any) => {
          this.hospitals.push(res.hospital);
        });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal(
      'hospitales',
      hospital._id as string,
      hospital.img as string
    );
  }
}
