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
    username: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['', Validators.required],
    rememberMe: [localStorage.getItem('remember') || false],
  });

  loginUser() {
    const body: FormData = new FormData();

    localStorage.setItem('userName', this.loginForm.get('username')?.value);
    this.router.navigateByUrl('/dashboard');
  }
}
