import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp,
  heartOutline, heartSharp, archiveOutline, archiveSharp,
  trashOutline, trashSharp, warningOutline, warningSharp,
  bookmarkOutline, bookmarkSharp, logInOutline, logIn, list, listOutline, listSharp,
  personCircleOutline
} from 'ionicons/icons';

import { sunnyOutline, moonOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonAvatar, IonIcon, IonLabel, IonMenuToggle, IonMenu } from "@ionic/angular/standalone";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonAvatar, IonItem, IonList, IonContent, IonMenu,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslateModule,
    CommonModule,
    IonMenuToggle

  ]
})
export class MenuComponent implements OnInit {
  userInfo: any;

  constructor() {
    addIcons({ personCircleOutline, listOutline, listSharp, list, logIn, logInOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, sunnyOutline, moonOutline });
  }

  ngOnInit() {
    (window as any).console.log('[MYAPP] اپ اجرا شد!');

    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
    }
  }




  // toggleDarkTheme(event: any) {
  //   this.darkMode = event.detail.checked; // Get the toggle's checked state
  //   document.body.classList.toggle('dark', this.darkMode);
  //   localStorage.setItem('darkMode', this.darkMode.toString());
  // }



}