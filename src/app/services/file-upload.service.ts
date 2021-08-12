import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePhoto(
    file: File,
    role: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${BASE_URL}/upload/${role}/${id}`;
      const formData: FormData = new FormData();

      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await response.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
