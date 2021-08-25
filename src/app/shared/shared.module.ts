import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    SidebarComponent,
    ModalImageComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BreadcrumbComponent,
    HeaderComponent,
    SidebarComponent,
    ModalImageComponent,
  ],
})
export class SharedModule {}
