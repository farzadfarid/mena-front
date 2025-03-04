import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonTitle, IonContent
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-inbox2',
  templateUrl: './inbox2.component.html',
  styleUrls: ['./inbox2.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent
  ]
})
export class Inbox2Component implements OnInit {

  constructor() { }

  ngOnInit() { }

}
