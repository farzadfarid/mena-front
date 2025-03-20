import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logInOutline, personCircle } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonButton, IonTextarea, IonGrid, IonRow, IonCol, IonIcon, IonAvatar,
  IonContent, IonLabel, IonInput, IonItem
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../../Core/Modal/modal/modal.component";
import { PolicyComponent } from 'src/app/Features/shared/policy/policy.component';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BankCardFormComponent } from 'src/app/Features/shared/bank-card-form/bank-card-form.component';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonLabel, IonContent, CommonModule, IonGrid, IonRow, IonCol, IonIcon, IonAvatar,
    IonTextarea, IonButton, TranslateModule, ReactiveFormsModule, ModalComponent]
})
export class RegisterCompanyComponent implements OnInit {
  registerForm!: FormGroup;
  logoImage: string | null = null;
  content = "";
  title = "";
  isAgree = false;
  ruleContent = "";
  ruleTitle = "";
  @ViewChild('modal') modal!: ModalComponent;
  langChangeSubscription!: Subscription;
  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private translate: TranslateService) {
    addIcons({ personCircle, logInOutline });

    this.registerForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      bankInfo: ['', Validators.required],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      agreeTerms: [false, Validators.requiredTrue],
      logoImage: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]

    });
  }

  private hasModalOpened = false;
  presentModal() {
    if (!this.hasModalOpened) {
      this.modal.openModal();
      this.hasModalOpened = true;
      localStorage.setItem('hasModalOpened', 'true'); // ذخیره مقدار در localStorage
    }

  }


  ngOnInit() {

    this.loadTranslations(); // بارگذاری ترجمه‌ها در ابتدا

    // گوش دادن به تغییر زبان
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
    const modalOpened = localStorage.getItem('hasModalOpened');
    if (!modalOpened) {
      this.hasModalOpened = false;
    }
  }

  loadTranslations() {
    this.translate.get('Modal_Content_CompanySpecialist').subscribe((res: string) => {
      this.content = res;
    });
    this.translate.get('Modal_Title_CompanySpecialist').subscribe((res: string) => {
      this.title = res;
    });

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

  async uploadImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos // You can change to 'Camera' to use the camera
      });

      if (image.base64String) {
        this.logoImage = `data:image/jpeg;base64,${image.base64String}`;
        this.registerForm.patchValue({ logoImage: this.logoImage });
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
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
