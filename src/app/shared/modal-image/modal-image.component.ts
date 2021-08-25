import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public userImage!: File;
  public user!: Usuario;
  public temporalImage: string | null = null;
  public hasShown: boolean = true;

  constructor(
    public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.temporalImage = null;
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {
    const file = event.target?.files[0];
    this.userImage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.temporalImage = reader.result as string;
    };
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    Swal.showLoading();
    this.fileUploadService.updatePhoto(this.userImage, type, id).then(
      (img) => {
        Swal.fire(
          '¡Genial',
          'Tu foto de perfil fue actualizada exitosamente.',
          'success'
        );
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      },
      (err) => {
        Swal.fire(
          '¡Error!',
          'Ocurrió un error al momento de actualizar tu imagen',
          'error'
        );
        this.closeModal();
      }
    );
  }
}
