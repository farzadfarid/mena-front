import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton, IonSelect, IonSelectOption, IonIcon, IonAvatar, IonRow, IonCol, IonGrid,
  IonContent, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonCard
} from '@ionic/angular/standalone';
import { ModalComponent } from "../../../Core/Modal/modal/modal.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { PolicyComponent } from '../../shared/policy/policy.component';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-specialist-property',
  templateUrl: './specialist-property.component.html',
  styleUrls: ['./specialist-property.component.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonCard, IonCardHeader, IonLabel, IonContent, IonIcon, CommonModule,
    TranslateModule, IonSelect, IonSelectOption, IonCardTitle, IonCardContent, IonButton, ReactiveFormsModule, ModalComponent]
})
export class SpecialistPropertyComponent {
  ruleContent = "";
  ruleTitle = "";
  isAgree = false;
  langChangeSubscription!: Subscription;
  specialist = {
    name: 'John Doe',
    role: 'Electrician',
    cardStatus: 'Processing',
    cardDate: new Date(new Date().setDate(new Date().getDate() + 7)) // One week from today
  };

  sizesForm: FormGroup;

  constructor(private fb: FormBuilder, private translate: TranslateService, private modalCtrl: ModalController) {
    this.sizesForm = this.fb.group({
      shoeSize: [''],
      pantSize: [''],
      tshirtSize: ['']
    });
    addIcons({ personCircleOutline });
  }

  submitSizes() {
    console.log('Selected Sizes:', this.sizesForm.value);
    // Here, data can be sent to an API
  }
  ngOnInit() {

    this.loadTranslations();

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });


  }

  loadTranslations() {
    this.translate.get('Rule Specialist Property Content').subscribe((res: string) => {
      this.ruleContent = res;
    });
    this.translate.get('Rule Specialist Property Title').subscribe((res: string) => {
      this.ruleTitle = res;
    });
  }


  async presentRule() {
    const modal = await this.modalCtrl.create({
      component: PolicyComponent,
      cssClass: 'custom-modal',
      componentProps: {
        title: this.ruleTitle,
        content: this.ruleContent
      }
    });
    modal.onWillDismiss().then((data) => {

      if (data.data) {
        this.isAgree = data.data.data;
      }
    });
    await modal.present();
  }

}
