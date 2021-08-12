import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user: Usuario;
  public userImage!: File;
  public temporalImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.user = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateUserProfile() {
    Swal.showLoading();
    this.usuarioService.updateUser(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire(
          '¡Genial!',
          'Tus datos fueron actualizados correctamente.',
          'success'
        );
      },
      (err) =>
        Swal.fire(
          '¡Error!',
          `${err.error.msg} <br> <strong>(Código ${err.status})</strong>`,
          'error'
        )
    );
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
    Swal.showLoading();
    this.fileUploadService
      .updatePhoto(this.userImage, 'usuarios', this.usuarioService.uid)
      .then(
        (img) => {
          this.user.img = img;
          Swal.fire(
            '¡Genial',
            'Tu foto de perfil fue actualizada exitosamente.',
            'success'
          );
        },
        (err) => {
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al momento de actualizar tu imagen',
            'error'
          );
        }
      );
  }
}
