import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton, IonSelect, IonSelectOption, IonTextarea, IonIcon, IonAvatar, IonRow, IonCol, IonGrid,
  IonContent, IonLabel, IonInput, IonItem,
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { personCircle, logInOutline, personCircleOutline } from 'ionicons/icons';
import { ModalComponent } from "../../../Core/Modal/modal/modal.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { BankCardFormComponent } from '../../shared/bank-card-form/bank-card-form.component';
import { PolicyComponent } from '../../shared/policy/policy.component';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerSpecialist',
  templateUrl: './registerSpecialist.component.html',
  styleUrls: ['./registerSpecialist.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, IonLabel, IonContent, IonIcon, IonAvatar, CommonModule, IonRow, IonCol, IonGrid,
    TranslateModule, IonSelect, IonSelectOption, IonTextarea, IonButton, ReactiveFormsModule, ModalComponent]
})
export class RegisterProfileComponent {
  @ViewChild('modal') modal!: ModalComponent;
  // @ViewChild('modalRule') modalRule!: ModalComponent;


  private hasModalOpened = false; // بررسی آیا مودال باز شده است یا نه
  registerForm: FormGroup;
  profileImage: string | null = null;
  content = "";
  title = "";
  isAgree = false;
  ruleContent = "";
  ruleTitle = "";
  langChangeSubscription!: Subscription;
  constructor(private route: Router, private message: ToastService, private modalCtrl: ModalController, private translate: TranslateService, private fb: FormBuilder) {

    addIcons({ logInOutline, personCircle, personCircleOutline });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      language: ['', Validators.required],
      bankInfo: ['', Validators.required],
      skills: ['', Validators.required],
      address: ['', Validators.required],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      agreeTerms: [false, Validators.requiredTrue],
      profileImage: [''],
      password: ['', Validators.requiredTrue],
      confirmPassword: ['', Validators.requiredTrue],
    });
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
        this.profileImage = `data:image/jpeg;base64,${image.base64String}`;
        this.registerForm.patchValue({ profileImage: this.profileImage });
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  }
  async openBankCardModal() {
    const modal = await this.modalCtrl.create({
      component: BankCardFormComponent,
      cssClass: 'custom-modal'
    });

    await modal.present();
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
    this.translate.get('Modal_Content_RegisterSpecialist').subscribe((res: string) => {
      this.content = res;
    });
    this.translate.get('Modal_Title_RegisterSpecialist').subscribe((res: string) => {
      this.title = res;
    });

    this.translate.get('ruleContent').subscribe((res: string) => {
      this.ruleContent = res;
    });
    this.translate.get('ruleTitle').subscribe((res: string) => {
      this.ruleTitle = res;
    });
  }









  onSubmit() {
    // if (this.isAgree) {
    //   if (this.registerForm.valid) {
    //     console.log('Form Submitted:', this.registerForm.value);
    //   } else {
    //     console.log('Form Invalid');
    //   }
    // } else {
    //   this.message.showError("Please agree to the terms and conditions");
    // }
    this.route.navigate(['/specialist-property']);
  }

  presentModal() {
    if (!this.hasModalOpened) {
      this.modal.openModal();
      this.hasModalOpened = true;
      localStorage.setItem('hasModalOpened', 'true'); // ذخیره مقدار در localStorage
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

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
