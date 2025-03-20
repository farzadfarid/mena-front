import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption,
  IonButtons, IonButton, IonIcon, IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonInput
} from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bank-card-form',
  templateUrl: './bank-card-form.component.html',
  styleUrls: ['./bank-card-form.component.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonCardContent, TranslateModule, CommonModule, IonSelect, IonSelectOption, FormsModule, IonCard, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader,]
})
export class BankCardFormComponent implements OnInit {

  cardData = {
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  };

  months: string[] = [];
  years: string[] = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline });
    this.initializeDateOptions();
  }

  // مقداردهی اولیه لیست ماه‌ها و سال‌ها
  initializeDateOptions() {
    this.months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
  }

  // ارسال اطلاعات فرم
  submitForm() {
    console.log('اطلاعات کارت:', this.cardData);
    this.closeModal(); // بستن مودال پس از ارسال اطلاعات
  }

  // بستن مودال
  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
