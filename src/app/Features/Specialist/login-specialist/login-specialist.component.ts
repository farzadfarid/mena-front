import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ToastService } from 'src/app/Core/Services/toast.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { NotificationService } from 'src/app/Core/Services/notification.service';
import { RolesEnum } from 'src/app/Core/enums/roles.enum';

import { LoadingComponent } from "../../../Core/loading/loading.component";
import { environment } from 'src/environments/environment.development';

import {
  PushNotifications,
  Token,
  PushNotificationSchema,
} from '@capacitor/push-notifications';

import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login-specialist',
  templateUrl: './login-specialist.component.html',
  styleUrls: ['./login-specialist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, LoadingComponent]
})
export class LoginSpecialistComponent {
  public fcmToken: string = '';
  email = '';
  password = '';
  isLoading = false;
  currentUserId!: number;

  constructor(
    private notificationService: NotificationService,
    private platform: Platform,
    public router: Router,
    private message: ToastService,
    private authService: AuthService
  ) { }

  async login() {
    console.log('[LOGIN] backend url:', environment.url);
    this.isLoading = true;

    if (!this.email || !this.password) {
      this.message.showError('Invalid email or password!');
      this.isLoading = false;
      return;
    }

    try {
      const res = await this.authService.login({
        email: this.email,
        password: this.password,
        rememberMe: true
      }).toPromise();

      this.isLoading = false;
      console.log('[LOGIN]', '✅ response:', res);

      if (res?.data) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        this.currentUserId = userInfo.userId;

        // Initialize Push Notifications only on Android/iOS
        this.initPushNotifications();

        if (userInfo.role === RolesEnum[RolesEnum.specialist]) {
          this.router.navigate(['/dashboard']);
        }
      }

    } catch (error) {
      this.isLoading = false;
      console.error('Login error:', error);
      this.message.showError('Login failed. Please try again.');
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
        this.message.showInfo(`${notification.title}\n${notification.body}`);
      });

      // PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      //   console.log('🎯 Notification action performed:', notification);
      // });

    } catch (error) {
      console.error('[Push] Error initializing push notifications:', error);
    }
  }
}
