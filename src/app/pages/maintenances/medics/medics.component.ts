import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [],
})
export class MedicsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public medics: Medico[] = [];
  public temporalMedics: Medico[] = [];
  private $imgSubscription!: Subscription;

  constructor(
    private medicsService: MedicoService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadMedics();

    this.$imgSubscription = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadMedics());
  }

  ngOnDestroy() {
    if (this.modalImageService.newImage.closed) {
      this.$imgSubscription.unsubscribe();
    }
  }

  loadMedics() {
    this.loading = true;
    this.medicsService.loadMedics().subscribe((res: Medico[]) => {
      this.medics = this.temporalMedics = res;
      this.loading = false;
    });
  }

  openModal(medic: Medico) {
    this.modalImageService.openModal('medicos', medic._id as string, medic.img);
  }

  search(term: string) {
    if (term.length === 0) return (this.medics = this.temporalMedics);

    return this.searchesService
      .search('medicos', term)
      .subscribe((res) => (this.medics = res as Medico[]));
  }

  async deleteMedic(medic: Medico) {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${medic.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
    });

    if (result.isConfirmed) {
      this.medicsService.deleteMedic(medic._id).subscribe((res: any) => {
        Swal.fire(
          'Proceso completado',
          `${res.msg}: ${medic.name}.`,
          'success'
        );
        this.loadMedics();
      });
    }
  }
}
