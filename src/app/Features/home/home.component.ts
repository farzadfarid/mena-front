import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton, IonIcon,
  IonContent,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  goSelectPage() {
    this.router.navigateByUrl('/select-company-or-personal')
  }


  goSpecialistPage() {
    this.router.navigateByUrl('/register-specialist')

  }

  specialist() {
    this.router.navigateByUrl('/specialists')
  }
}
