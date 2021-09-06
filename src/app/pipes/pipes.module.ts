import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { PatientSexPipe } from './patient-sex.pipe';

@NgModule({
  declarations: [ImagePipe, PatientSexPipe],
  imports: [],
  exports: [ImagePipe, PatientSexPipe],
})
export class PipesModule {}
