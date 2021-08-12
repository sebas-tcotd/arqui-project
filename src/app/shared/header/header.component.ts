import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user!: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.user = usuarioService.usuario;
  }

  logoutUser() {
    this.usuarioService.logoutUser();
  }

  ngOnInit(): void {}
}
