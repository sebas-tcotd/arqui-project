import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { PatientSexPipe } from './patient-sex.pipe';
import { ClinicNumberPipe } from './clinic-number.pipe';

@NgModule({
  declarations: [ImagePipe, PatientSexPipe, ClinicNumberPipe],
  imports: [],
  exports: [ImagePipe, PatientSexPipe, ClinicNumberPipe],
})
export class PipesModule {}
