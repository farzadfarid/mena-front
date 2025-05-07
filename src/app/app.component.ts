import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Platform, AlertController } from '@ionic/angular';
import { SpecialistService } from './Core/Services/specialist.service';
import { MainComponent } from "./Layout/main/main.component";
import { IonApp } from "@ionic/angular/standalone";
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, MainComponent]
})
export class AppComponent implements OnInit {
  servicesEn: { id: number; name: string }[] = [];
  servicesSv: { id: number; name: string }[] = [];

  constructor(
    private specialistService: SpecialistService,
    private platform: Platform,
    private router: Router,
    private zone: NgZone,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.initializeCometChat();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.listenToNotificationClick();
      this.listenToNotificationReceived();
    });
  }

  ngOnInit(): void {
    this.specialistService.getAllServicesAndSaveInTheLocalStorage().subscribe({
      next: () => {
        this.servicesEn = this.specialistService.getServicesByLanguage('en');
        this.servicesSv = this.specialistService.getServicesByLanguage('sv');
        // console.log('✅ services loaded');
      },
      error: (err) => {
        console.error('❌ Failed to fetch and store services:', err);
      }
    });
  }

  // 📩 هندل کلیک روی نوتیف در حالت background یا kill
  listenToNotificationClick() {
    if (Capacitor.getPlatform() === 'web') return;

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      const data = notification.notification?.data;
      const appointmentId = data?.Appointment_Id;

      if (appointmentId) {
        const url = `/appointments/details/${appointmentId}`;
        this.zone.run(() => {
          this.router.navigateByUrl(url);
        });
      }
    });
  }

  // 🔔 هندل دریافت نوتیف در foreground
  listenToNotificationReceived() {
    if (Capacitor.getPlatform() === 'web') return;

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      const data = notification.data;
      const appointmentId = data?.Appointment_Id;

      const alert = await this.alertController.create({
        header: notification.title || 'Notification',
        message: notification.body || '',
        buttons: [
          {
            text: 'See more',
            handler: () => {
              if (appointmentId) {
                const url = `/appointments/details/${appointmentId}`;
                this.zone.run(() => {
                  this.router.navigateByUrl(url);
                });
              }
            }
          },
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      });

      await alert.present();
    });
  }



  initializeCometChat() {
    const appID = "2748703fb38b27a7";
    const region = "eu";

    const appSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();

    CometChat.init(appID, appSettings).then(
      () => {
        console.log("✅ CometChat initialized successfully");
      },
      (error) => {
        console.error("❌ CometChat initialization failed", error);
      }
    );
  }


}
