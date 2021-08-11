import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user: Usuario;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
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
    this.usuarioService.updateUser(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;
      Swal.fire(
        '¡Genial!',
        'Tus datos fueron actualizados correctamente.',
        'success'
      );
    });
  }
}
