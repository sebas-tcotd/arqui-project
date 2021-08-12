import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {}

  setTheme() {
    const theme =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linkTheme?.setAttribute('href', theme);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url); // Uso para la persistencia
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((element) => {
      element.classList.remove('working');
      const theme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${theme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
