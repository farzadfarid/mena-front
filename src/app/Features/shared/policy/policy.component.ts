import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonIcon, IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonCheckbox
} from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonLabel, IonItem, IonCardContent, FormsModule, TranslateModule, CommonModule, FormsModule, IonCard, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader,]
})
export class PolicyComponent implements OnInit {

  @Input() title: string = '';
  @Input() content: string = '';
  isAgree: boolean = false;
  @Output() agree: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline });
  }

  ngOnInit() {
    console.log('PolicyComponent', this.title, this.content);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  submitForm() {
    // this.agree.emit(this.isAgree);
    this.modalCtrl.dismiss({ data: this.isAgree });
    this.closeModal();
  }
}
