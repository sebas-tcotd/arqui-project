import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
