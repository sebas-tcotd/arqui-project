import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientSex',
})
export class PatientSexPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'hombre') return 'M';
    else return 'F';
  }
}
