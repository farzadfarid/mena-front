import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceAppointmentModel } from 'src/app/Core/Models/Specialists/ServiceAppointment.model';
import {
  IonButton,
  IonIcon,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent, IonChip
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { ExtendedServiceAppointmentModel } from 'src/app/Core/Models/Specialists/ExtendedServiceAppointment.model';
import { addIcons } from 'ionicons';
import { gridOutline, listOutline, personOutline, constructOutline, calendarOutline, alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, logoWechat } from 'ionicons/icons';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { AlertController } from '@ionic/angular';
import { CustomerService } from '../../Services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.component.html',
  styleUrls: ['./customer-services.component.scss'],
  standalone: true,
  imports: [IonChip,
    CommonModule,
    IonButton,
    IonIcon,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    DatePipe,
    TranslateModule, LoadingComponent]
})
export class CustomerServicesComponent implements OnInit {

  @Input() states: number[] = [1];
  // @Output() confirm = new EventEmitter<void>();
  // @Output() reject = new EventEmitter<void>();


  viewMode: 'list' | 'grid' = 'list';
  isLoading = false;
  appointments: ExtendedServiceAppointmentModel[] = [];

  constructor(private router: Router, public serviceAppointmentService: CustomerService, private message: ToastService, private alertController: AlertController) {
    addIcons({ logoWechat, personOutline, constructOutline, calendarOutline, alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, listOutline, gridOutline });
  }

  ngOnInit(): void {
    this.fetchAppointments();
  }
  ionViewWillEnter(): void {
    this.fetchAppointments();
  }


  fetchAppointments(event?: any): void {
    this.isLoading = true;
    const lang = localStorage.getItem('selectedLanguage') || 'en'; // 👈 گرفتن زبان از localStorage

    this.serviceAppointmentService.getAppointmentsByState(this.states)
      .subscribe({
        next: (res) => {
          console.log('ressssssssssss', res)
          this.appointments = res?.data.map(a => ({
            ...a,
            parsedServiceName: this.getLocalizedServiceName(a.serviceNameJson, lang)
          }));
          this.isLoading = false;
          if (event) event.target.complete();
        },
        error: () => {
          this.isLoading = false;
          if (event) event.target.complete();
        }
      });
  }


  getLocalizedServiceName(jsonString: string, lang: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return parsed[lang] || parsed['en'] || '';
    } catch {
      return '';
    }
  }

  toggleView(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  async confirmAppointment(item: ServiceAppointmentModel): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Appointment',
      message: 'Are you sure you want to confirm this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.serviceAppointmentService.confirmAppointment(item.id).subscribe({
              next: () => {
                this.message.showSuccess('Appointment confirmed!');
                this.fetchAppointments();
              },
              error: () => {
                this.message.showError('Failed to confirm appointment');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }



  async rejectAppointment(item: ServiceAppointmentModel): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Reject Appointment',
      subHeader: 'Please enter reason',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Enter reason for rejection'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reject',
          handler: (data) => {
            const reason = data.reason?.trim();
            if (!reason) return false; // block if empty

            this.serviceAppointmentService.rejectAppointment(item.id, reason).subscribe({
              next: () => {
                this.message.showSuccess('Appointment rejected.');
                this.fetchAppointments();
              },
              error: () => {
                this.message.showError('Failed to reject appointment.');
              }
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }



  async cancelAppointment(item: ServiceAppointmentModel): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cancel Appointment',
      subHeader: 'Please enter reason',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Enter reason for Cancelation'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: (data) => {
            const reason = data.reason?.trim();
            if (!reason) return false; // block if empty

            this.serviceAppointmentService.cancelAppointment(item.id, reason).subscribe({
              next: () => {
                this.message.showSuccess('Appointment Canceled.');
                this.fetchAppointments();
              },
              error: () => {
                this.message.showError('You cannot cancel your appointment 30 minutes after confirmation.');
              }
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }


  chat(item: any) {
    this.router.navigate(['/chat'], {
      queryParams: { receiverId: item.specialistId, receiverName: item.specialistFullName, receiverRole: 'specialist' }
    });
  }

}
