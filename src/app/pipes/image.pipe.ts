import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) return `${BASE_URL}/upload/${type}/no-image`;

    if (img?.includes('https')) return img;

    if (img) return `${BASE_URL}/upload/${type}/${img}`;

    return `${BASE_URL}/upload/${type}/no-image`;
  }
}
