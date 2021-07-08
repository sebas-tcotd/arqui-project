import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress bar', url: 'progress' },
        { title: 'Gráfica', url: 'grafica1' },
        { title: 'Promesas', url: 'promises' },
        { title: 'RxJs', url: 'rxjs' },
      ],
    },
  ];

  constructor() {}
}
