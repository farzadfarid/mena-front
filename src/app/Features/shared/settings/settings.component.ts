import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { contrast, globe, lockClosed, notifications, person, trash } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule, TranslateModule],
})
export class SettingsComponent implements OnInit {

  notificationsEnabled: boolean = true;
  darkMode: boolean = false;

  constructor(private router: Router) {
    addIcons({ person, lockClosed, notifications, globe, contrast, trash })
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  ngOnInit() {
    this.initializeDarkTheme();
  }

  initializeDarkTheme() {
    // Check for user preference in localStorage
    const prefersDark = localStorage.getItem('darkMode');

    if (prefersDark === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark');
    } else if (prefersDark === null) {
      // Check for system preference if not set in localStorage
      const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDarkMedia.matches) {
        this.darkMode = true;
        document.body.classList.add('dark');
      }
    }
  }


  toggleDarkTheme(event: any) {
    this.darkMode = event.detail.checked; // Get the toggle's checked state
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString());
  }


}
