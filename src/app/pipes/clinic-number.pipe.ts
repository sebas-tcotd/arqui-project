import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clinicNumber',
})
export class ClinicNumberPipe implements PipeTransform {
  transform(value: string): string {
    return `CM-${value}`;
  }
}
