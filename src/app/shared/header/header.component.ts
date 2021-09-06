import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user!: Usuario;
  userName: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.userName = localStorage.getItem('userName') as string;
  }

  logoutUser() {
    this.usuarioService.logoutUser();
  }

  ngOnInit(): void {}

  search(term: string) {
    if (term.length === 0) this.router.navigateByUrl('/dashboard');
    this.router.navigate(['dashboard', 'search', term]);
  }
}
