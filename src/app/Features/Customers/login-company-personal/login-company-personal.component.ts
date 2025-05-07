import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { LoadingComponent } from "../../../Core/loading/loading.component";

import { NotificationService } from 'src/app/Core/Services/notification.service';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
} from '@capacitor/push-notifications';

import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-login-company-personal',
  templateUrl: './login-company-personal.component.html',
  styleUrls: ['./login-company-personal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, LoadingComponent],
})
export class LoginCompanyPersonalComponent {

  email = '';
  password = '';
  isLoading = false;
  public fcmToken: string = '';
  constructor(public router: Router, private message: ToastService, private authService: AuthService,

    private notificationService: NotificationService,
    private platform: Platform,
  ) { }

  async login() {
    this.isLoading = true;
    if (this.email === '' && this.password === '') {
      this.message.showError('Invalid email or password!');
      this.isLoading = false;
      return;
    }
    else {
      this.authService.login({ email: this.email, password: this.password, rememberMe: true }).subscribe(res => {
        this.isLoading = false;
        if (res.data !== '') {
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
          this.initPushNotifications();






          this.router.navigate(['/dashboard']);
        }
      })
    }
  }




  private async initPushNotifications() {
    if (Capacitor.getPlatform() === 'web') {
      console.log('[Push] Skipping push setup on web platform');
      return;
    }

    try {
      await this.platform.ready();
      const permissionResult = await PushNotifications.requestPermissions();
      if (permissionResult.receive !== 'granted') {
        console.warn('[Push] Permission not granted');
        return;
      }

      await PushNotifications.register();

      PushNotifications.addListener('registration', (token: Token) => {
        console.log('🔐 FCM Token:', token.value);
        this.fcmToken = token.value;
        this.notificationService.saveFcmToken(this.fcmToken).subscribe(() => {
          console.log('توکن ذخیره شد ✅');
        });
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        console.log('📩 Push received:', notification);
        alert(`${notification.title}\n${notification.body}`);
      });

      // PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      //   console.log('🎯 Notification action performed:', notification);
      // });

    } catch (error) {
      console.error('[Push] Error initializing push notifications:', error);
    }
  }
}
