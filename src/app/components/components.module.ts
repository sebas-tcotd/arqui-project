import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';

@NgModule({
  declarations: [IncrementadorComponent, DonutComponent, ClinicFormComponent],
  imports: [CommonModule, FormsModule, ChartsModule, ReactiveFormsModule],
  exports: [IncrementadorComponent, DonutComponent, ClinicFormComponent],
})
export class ComponentsModule {}
