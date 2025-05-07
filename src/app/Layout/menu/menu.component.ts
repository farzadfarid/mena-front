import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/Core/Services/auth.service';

import {
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp,
  heartOutline, heartSharp, archiveOutline, archiveSharp,
  trashOutline, trashSharp, warningOutline, warningSharp,
  bookmarkOutline, bookmarkSharp, logInOutline, logIn, list, listOutline, listSharp,
  personCircleOutline, calendarOutline,
  buildOutline,
  helpOutline,
  checkmarkOutline,
  homeOutline,
  homeSharp
} from 'ionicons/icons';

import { sunnyOutline, moonOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonAvatar, IonIcon, IonLabel, IonMenuToggle, IonMenu } from "@ionic/angular/standalone";
import { RolesEnum } from 'src/app/Core/enums/roles.enum';

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
  constructor(public authService: AuthService, private router: Router) {
    addIcons({ helpOutline, checkmarkOutline, homeOutline, homeSharp, buildOutline, personCircleOutline, calendarOutline, logInOutline, listOutline, listSharp, list, logIn, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, sunnyOutline, moonOutline });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userInfo');
  }


  logout() {
    this.authService.clearAuthData();
    this.router.navigate(['/home']);
    // location.reload();
  }




  ngOnInit() {
    this.authService.userInfo$.subscribe((user) => {
      this.userInfo = user;
    });

    this.authService.loadUserInfoFromStorage();

    console.log("userInfo", this.userInfo)
  }




  // toggleDarkTheme(event: any) {
  //   this.darkMode = event.detail.checked; // Get the toggle's checked state
  //   document.body.classList.toggle('dark', this.darkMode);
  //   localStorage.setItem('darkMode', this.darkMode.toString());
  // }



}