import { Component, OnInit } from '@angular/core';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
} from '@capacitor/push-notifications';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Core/Services/notification.service';
import {
  IonButton, IonTextarea, IonGrid, IonRow, IonCol, IonIcon, IonAvatar,
  IonContent, IonLabel, IonInput, IonItem, IonCardContent, IonCard, IonCardHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-firebasetest',
  templateUrl: './firebasetest.component.html',
  styleUrls: ['./firebasetest.component.scss'],
  imports: [IonCardHeader, IonCard, IonCardContent, IonButton],
})
export class FirebasetestComponent implements OnInit {

  public fcmToken: string = '';
  currentUserId = 1008; // 👈 مقدار واقعی رو باید از auth بگیری
  expertUserId = 1030;  // 👈 شناسه متخصصی که نوتیف براش می‌فرستی
  constructor(
    private platform: Platform,
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });

      // گرفتن توکن FCM
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('🔐 FCM Token:', token.value);
        this.fcmToken = token.value;

        this.notificationService.saveFcmToken(this.currentUserId, this.fcmToken).subscribe(() => {
          console.log('توکن ذخیره شد ✅');
        });
      });

      // دریافت پیام
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        console.log('📩 Push received:', notification);
        alert(`${notification.title}\n${notification.body}`);
      });
    });
  }

  sendNotificationToExpert() {
    this.notificationService.getFcmToken(this.expertUserId).subscribe(token => {
      this.notificationService.sendPushNotification(token, 'درخواست رزرو', 'کاربر می‌خواد شما رو رزرو کنه').subscribe(() => {
        alert('نوتیف فرستاده شد ✅');
      });
    });
  }
}
