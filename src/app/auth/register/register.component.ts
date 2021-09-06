import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, [Validators.required, Validators.requiredTrue]],
    },
    {
      validators: this.equalPasswords('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuario: UsuarioService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.usuario.createUser(this.registerForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          // Si ocurre un error
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
          });
        }
      );
    }
  }

  isFieldValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  agreeTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  arePasswordsValid() {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    if (password1 !== password2 && this.formSubmitted) {
      return false;
    } else {
      return true;
    }
  }

  equalPasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notEqual: true });
      }
    };
  }
}
