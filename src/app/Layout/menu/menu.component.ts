import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonMenu, IonContent, IonList, IonListHeader,
  IonMenuToggle, IonItem, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp,
  heartOutline, heartSharp, archiveOutline, archiveSharp,
  trashOutline, trashSharp, warningOutline, warningSharp,
  bookmarkOutline, bookmarkSharp, logInOutline, logIn, list, listOutline, listSharp
} from 'ionicons/icons';
import { sunnyOutline, moonOutline } from 'ionicons/icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    FormsModule,
    TranslateModule
  ]
})
export class MenuComponent implements OnInit {
  darkMode = false;

  constructor() {
    addIcons({ listOutline, listSharp, list, logIn, logInOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, sunnyOutline, moonOutline });
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


  // toggleDarkTheme(event: any) {
  //   this.darkMode = event.detail.checked; // Get the toggle's checked state
  //   document.body.classList.toggle('dark', this.darkMode);
  //   localStorage.setItem('darkMode', this.darkMode.toString());
  // }



}