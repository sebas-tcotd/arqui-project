import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  loginUser() {
    this.usuarioService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // this.router.navigateByUrl('/');
  }
}
