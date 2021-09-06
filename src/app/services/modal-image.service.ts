import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal: boolean = true;
  public type!: 'usuarios' | 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = '';
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal() {
    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() {}
}
