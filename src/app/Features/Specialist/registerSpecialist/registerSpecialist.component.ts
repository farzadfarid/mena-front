import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton, IonSelect, IonSelectOption, IonTextarea, IonIcon, IonAvatar, IonRow, IonCol, IonGrid,
  IonContent, IonLabel, IonInput, IonItem, IonNote
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { personCircle, logInOutline, personCircleOutline, calendarOutline } from 'ionicons/icons';
import { ModalComponent } from "../../../Core/Modal/modal/modal.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { BankCardFormComponent } from '../../shared/bank-card-form/bank-card-form.component';
import { PolicyComponent } from '../../shared/policy/policy.component';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { SkillModel } from 'src/app/Core/Models/Specialists/specialistService.model';

@Component({
  selector: 'app-registerSpecialist',
  templateUrl: './registerSpecialist.component.html',
  styleUrls: ['./registerSpecialist.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonNote, IonItem, IonInput, IonLabel, IonContent, IonIcon, IonAvatar, CommonModule, IonRow, IonCol, IonGrid,
    TranslateModule, IonSelect, IonSelectOption, CommonModule, IonTextarea, IonButton, ReactiveFormsModule, ModalComponent, LoadingComponent]
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
  language: string = '';
  servicesEn: { id: number; name: string }[] = [];
  servicesSv: { id: number; name: string }[] = [];
  serviceLists: any[] = [];
  skillLists: any[] = [];
  selectedFile: File | null = null;
  isLoading = false;
  maxDate: string = '';
  selectedBirthDate: string = '';
  currentLang = 'en';
  resumeFile: File | null = null;

  constructor(private specialistService: SpecialistService, private route: Router, private message: ToastService, private modalCtrl: ModalController, private translate: TranslateService, private fb: FormBuilder) {

    addIcons({ personCircle, calendarOutline, logInOutline, personCircleOutline });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      language: ['', Validators.required],
      bankId: ['123', Validators.required],
      serviceId: [null, Validators.required],
      skillsId: [null, Validators.required],
      address: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      agreeTerms: [false, Validators.required],
      avatar: [''],
      resume: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required]

    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onBirthDateChange(event: any) {
    const isoDate = event.detail.value; // مثلاً "1995-06-15T00:00:00.000Z"
    this.selectedBirthDate = isoDate?.split('T')[0]; // فقط بخش yyyy-mm-dd

    // مقدار رو به فرم ست می‌کنیم
    this.registerForm.patchValue({
      birthDate: isoDate
    });

    // برای اینکه touched هم حساب بشه (موقع چک ولیدیشن)
    this.registerForm.get('birthDate')?.markAsTouched();
  }

  onBirthDateModalDismiss() {
    const value = this.registerForm.get('birthDate')?.value;
    const control = this.registerForm.get('birthDate');

    if (!value) {
      control?.markAsTouched();
      control?.updateValueAndValidity();
    }
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

  private base64ToBlob(base64Data: string, contentType: string = 'image/jpeg'): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }





  async openBankCardModal() {
    const modal = await this.modalCtrl.create({
      component: BankCardFormComponent,
      cssClass: 'custom-modal'
    });

    await modal.present();
  }
  ngOnInit() {

    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    //کاربر نمیتونه تاریخ آینده رو ثبت کنه
    this.maxDate = new Date().toISOString();

    this.loadTranslations(); // بارگذاری ترجمه‌ها در ابتدا

    // گوش دادن به تغییر زبان
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });

    const modalOpened = localStorage.getItem('hasModalOpened');
    if (!modalOpened) {
      this.hasModalOpened = false;
    }



    this.language = localStorage.getItem('selectedLanguage') || '';
    this.specialistService.getAllServicesAndSaveInTheLocalStorage().subscribe((res) => {
      this.servicesEn = this.specialistService.getServicesByLanguage('en');
      this.servicesSv = this.specialistService.getServicesByLanguage('sv');

    });
    if (this.language == 'en') {
      this.serviceLists = this.servicesEn

    } else {
      this.serviceLists = this.servicesSv
    }




  }


  onChangeService(event: any) {
    const selectedId = event.detail.value;
    this.isLoading = true;
    this.specialistService.getServiceSkills(selectedId).subscribe((res) => {
      this.isLoading = false;
      console.log(res);
      this.skillLists = res.data;
    })
  }

  getLocalizedSkillName(skill: SkillModel): any {
    if (skill) {
      return skill?.name?.values?.[this.currentLang] || 'No name';
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

  onResumeSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.resumeFile = file;
      this.registerForm.patchValue({ resume: file.name }); // فقط برای نمایش
    } else {
      this.message.showError('Please select a valid PDF file.');
      this.resumeFile = null;
    }
  }
  onSubmit() {

    this.isLoading = true;
    if (this.isAgree) {
      this.registerForm.patchValue({ agreeTerms: this.isAgree });
      if (this.registerForm.valid) {
        const formData = new FormData();
        formData.append('firstName', this.registerForm.value.firstName);
        formData.append('lastName', this.registerForm.value.lastName);
        formData.append('phoneNumber', this.registerForm.value.phoneNumber);
        formData.append('email', this.registerForm.value.email);
        formData.append('language', this.registerForm.value.language);
        formData.append('bankId', this.registerForm.value.bankId);
        formData.append('serviceId', this.registerForm.value.serviceId);
        formData.append('address', this.registerForm.value.address);
        formData.append('description', this.registerForm.value.description);
        formData.append('password', this.registerForm.value.password);
        formData.append('confirmPassword', this.registerForm.value.confirmPassword);
        formData.append('birthDate', this.registerForm.value.birthDate);
        this.registerForm.value.skillsId.forEach((id: number) => {
          formData.append('skillsId', id.toString());
        });


        if (this.profileImage) {
          const base64 = this.profileImage.split(',')[1]; // جدا کردن base64 از data:image/jpeg;base64,...
          const imageBlob = this.base64ToBlob(base64, 'image/jpeg');
          formData.append('avatar', imageBlob, 'profile.jpg');
        } else {
          this.message.showError("Please select profile image");
          this.isLoading = false;
          return;
        }

        if (this.resumeFile) {
          formData.append('resume', this.resumeFile, this.resumeFile.name);
        } else {
          this.message.showError("Please select your resume file");
          this.isLoading = false;
          return;
        }
        console.log(formData);

        this.specialistService.registerSpecialist(formData).subscribe((res) => {
          // if (res.responseCode == 200) {
          this.isLoading = false;
          this.message.showSuccess("Specialist registered successfully");
          this.route.navigate(['/dashboard']);
          // }
        });
      } else {
        this.isLoading = false;
        this.message.showError("Please fill all fields");
        console.warn('❌ Invalid form. Errors:', this.registerForm.value);
        Object.keys(this.registerForm.controls).forEach(key => {
          const control = this.registerForm.get(key);
          if (control && control.invalid) {
            console.warn(`❌ ${key} is invalid. Errors:`, control.errors);
          }
        });

      }
    } else {
      this.isLoading = false;
      this.message.showError("Please agree to the terms and conditions");
    }

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
