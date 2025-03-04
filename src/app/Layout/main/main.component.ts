import { Component, inject, OnInit } from '@angular/core';
import { IonSplitPane, IonRouterOutlet, IonTabs } from '@ionic/angular/standalone';
import { MenuComponent } from '../menu/menu.component';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';
import {
  homeOutline,
  searchOutline,
  notificationsOutline,
  settingsOutline, playCircle, radio, library,
  search
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [IonTabs, IonSplitPane, IonTabs,
    IonRouterOutlet,
    MenuComponent, IonLabel
    , IonTabBar, IonTabButton, IonIcon,
  ]
})
export class MainComponent implements OnInit {

  router = inject(Router);
  constructor() {
    // Add icons that will be used in the tabs
    addIcons({ playCircle, radio, library, search, homeOutline, searchOutline, notificationsOutline, settingsOutline });
  }

  ngOnInit() { }

  homePage() {
    this.router.navigateByUrl('/inbox')
  }

}
