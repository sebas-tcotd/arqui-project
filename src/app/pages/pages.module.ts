import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [DashboardComponent, Grafica1Component, ProgressComponent],
  exports: [DashboardComponent, Grafica1Component, ProgressComponent],
  imports: [CommonModule, RouterModule, PagesRoutingModule],
})
export class PagesModule {}
