import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalOfUsers: number = 0;
  public users: Usuario[] = [];
  public temporalUsers: Usuario[] = [];
  public currentPage: number = 0;
  public loading: boolean = true;
  public $imgSubscription!: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private searchesService: SearchesService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadUsers());
  }

  ngOnDestroy() {
    this.$imgSubscription.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.usuarioService
      .loadUsers(this.currentPage)
      .subscribe(({ total, users }) => {
        this.totalOfUsers = total;
        this.users = users;
        this.temporalUsers = users;
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.currentPage += value;
    if (this.currentPage < 0) {
      this.currentPage = 0;
    } else if (this.currentPage > this.totalOfUsers) {
      this.currentPage -= value;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) return (this.users = this.temporalUsers);

    return this.searchesService
      .search('usuarios', term)
      .subscribe((res) => (this.users = res));
  }

  async deleteUser(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No te puedes borrar a ti mismo. 😅', 'error');
    }

    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${usuario.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
    });

    if (result.isConfirmed) {
      this.usuarioService.deleteUser(usuario).subscribe((res: any) => {
        Swal.fire(
          'Proceso completado',
          `${res.msg}: ${usuario.name}.`,
          'success'
        );
        this.loadUsers();
      });
    }

    return;
  }

  changeRole(user: Usuario) {
    this.usuarioService
      .changeUserRole(user)
      .subscribe((res) => console.table(res));
  }

  openModal(user: Usuario) {
    this.modalImageService.openModal('usuarios', user.uid as string, user.img);
  }
}
