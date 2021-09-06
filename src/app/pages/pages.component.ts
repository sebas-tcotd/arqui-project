import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  public year = new Date();

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.settingsService.setTheme();
    this.sidebarService.loadMenu();
  }
}
