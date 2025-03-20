import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonIcon
  , IonRadio, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonRadioGroup, IonContent
} from '@ionic/angular/standalone';
import { businessOutline, personOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-company-or-personal',
  templateUrl: './select-company-or-personal.component.html',
  styleUrls: ['./select-company-or-personal.component.scss'],
  imports: [CommonModule, FormsModule, IonIcon, IonRadioGroup, IonContent, TranslateModule,
    IonGrid, IonRow, IonCol,
    IonRadio, IonLabel, IonButton],
})
export class SelectCompanyOrPersonalComponent implements OnInit {
  selectedType: 'company' | 'personal' | 'specialist' | null = null;
  constructor(private router: Router) {
    addIcons({ personOutline, businessOutline });
  }

  navigateToRegister() {
    if (this.selectedType === 'company') {
      this.router.navigate(['/login-companyPersonal']);
    } else if (this.selectedType === 'personal') {
      this.router.navigate(['/login-companyPersonal']);
    } else if (this.selectedType === 'specialist') {
      this.router.navigate(['/login-specialist']);
    }
  }

  ngOnInit() { }

}
