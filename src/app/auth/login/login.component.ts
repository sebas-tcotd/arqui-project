import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone,
    private cookieService: CookieService
  ) {}

  ngOnInit() {}

  public loginForm = this.fb.group({
    cpm: [localStorage.getItem('cpm') || '', [Validators.required]],
    password: ['', Validators.required],
    rememberMe: [localStorage.getItem('remember') || false],
  });

  loginUser() {
    const body = {
      cpm: this.loginForm.get('cpm')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.usuarioService.loginUser(body).subscribe(
      (res) => {
        localStorage.setItem('cpm', this.loginForm.get('cpm')?.value);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => console.error(err.error.message)
    );
  }
}
