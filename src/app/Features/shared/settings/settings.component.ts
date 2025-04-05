import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { contrast, globe, languageOutline, lockClosed, notifications, person, trash } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { IonContent, IonList, IonItem, IonIcon, IonLabel, IonToggle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [IonToggle, IonLabel, IonIcon, IonItem, IonList, IonContent, CommonModule, RouterModule, FormsModule, TranslateModule, LoadingComponent],
})
export class SettingsComponent implements OnInit {

  notificationsEnabled: boolean = true;
  darkMode: boolean = false;
  isLoading = false;
  selectedLanguage = localStorage.getItem('selectedLanguage') || 'sv';

  constructor(private router: Router, private translate: TranslateService) {
    addIcons({ person, lockClosed, notifications, globe, contrast, trash, languageOutline });

    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    }

    this.translate.use(this.selectedLanguage);
    document.documentElement.lang = this.selectedLanguage;
  }

  changeLanguage(event: any) {

    const isEnglish = event.detail.checked;
    const lang = isEnglish ? 'en' : 'sv';

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.translate.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    console.log('Language changed to:', lang);
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
