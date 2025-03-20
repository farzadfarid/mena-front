import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logInOutline, personCircle } from 'ionicons/icons';
import {
  IonButton, IonGrid, IonRow, IonCol,
  IonContent, IonLabel, IonInput, IonItem
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { BankCardFormComponent } from 'src/app/Features/shared/bank-card-form/bank-card-form.component';
import { ModalComponent } from "../../../../Core/Modal/modal/modal.component";
import { PolicyComponent } from 'src/app/Features/shared/policy/policy.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.component.html',
  styleUrls: ['./register-personal.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonLabel, IonContent, IonGrid, IonRow, IonCol, TranslateModule,
    IonButton, ReactiveFormsModule, ModalComponent]
})
export class RegisterPersonalComponent {
  isAgree = false;
  ruleContent = "";
  ruleTitle = "";
  registerForm!: FormGroup;
  langChangeSubscription!: Subscription;
  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private translate: TranslateService) {
    addIcons({ personCircle, logInOutline });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      bankInfo: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      password: ['', Validators.requiredTrue],
      confirmPassword: ['', Validators.requiredTrue],


    });
  }
  ngOnInit() {
    this.loadTranslations(); // بارگذاری ترجمه‌ها در ابتدا

    // گوش دادن به تغییر زبان
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }


  loadTranslations() {
    this.translate.get('ruleContent').subscribe((res: string) => {
      this.ruleContent = res;
    });
    this.translate.get('ruleTitle').subscribe((res: string) => {
      this.ruleTitle = res;
    });
  }






  async openBankCardModal() {
    const modal = await this.modalCtrl.create({
      component: BankCardFormComponent,
      cssClass: 'custom-modal'
    });

    await modal.present();
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



  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
