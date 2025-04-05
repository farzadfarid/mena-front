import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { logInOutline, personCircle } from 'ionicons/icons';
import {
  IonButton, IonGrid, IonRow, IonCol,
  IonContent, IonLabel, IonInput, IonItem, IonNote 
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { BankCardFormComponent } from 'src/app/Features/shared/bank-card-form/bank-card-form.component';
import { ModalComponent } from "../../../../Core/Modal/modal/modal.component";
import { PolicyComponent } from 'src/app/Features/shared/policy/policy.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { userRealRegisterModel } from 'src/app/Core/Models/User/realUser.model';
import { LoadingComponent } from "../../../../Core/loading/loading.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.component.html',
  styleUrls: ['./register-personal.component.scss'],
  standalone: true,
  imports: [IonNote, IonItem, IonInput, IonLabel, IonContent, IonGrid, IonRow, IonCol, TranslateModule,
    IonButton, ReactiveFormsModule, ModalComponent, LoadingComponent, CommonModule]
})
export class RegisterPersonalComponent {
  isAgree = false;
  ruleContent = "";
  ruleTitle = "";
  isLoading = false;
  registerForm!: FormGroup<any>;
  langChangeSubscription!: Subscription;
  constructor(private message: ToastService, private fb: FormBuilder, private modalCtrl: ModalController, private translate: TranslateService, private service: AuthService) {
    addIcons({ personCircle, logInOutline });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      bankInfo: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],

    }, { validators: this.passwordsMatchValidator });

  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
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

    this.isLoading = true;
    if (this.registerForm.errors?.['passwordsMismatch']) {
      this.isLoading = false;
      this.message.showError("Passwords do not match");
      return;
    }

    console.log(this.registerForm);
    if (this.isAgree) {
      if (this.registerForm.valid) {
        const model: userRealRegisterModel = {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          phoneNumber: this.registerForm.value.phoneNumber,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          confirmPassword: this.registerForm.value.confirmPassword,
          bankId: "123456",
          language: localStorage.getItem('lang') || 'en'
        };
        this.service.userRealRegister(model).subscribe(res => {
          this.isLoading = false;
          this.message.showSuccess("User Registered Successfully");
        });
      } else {
        this.isLoading = false;
        this.message.showError("Please fill the form correctly");
      }
    } else {
      this.isLoading = false;
      this.message.showError("Please agree to the terms and conditions");
    }
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
