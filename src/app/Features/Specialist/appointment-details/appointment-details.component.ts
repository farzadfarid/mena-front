import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner, IonIcon, IonChip, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import { ExtendedServiceAppointmentModel } from 'src/app/Core/Models/Specialists/ExtendedServiceAppointment.model';
import { TranslateModule } from '@ngx-translate/core';
import { alertCircleOutline, calendarOutline, checkmarkCircleOutline, closeCircleOutline, constructOutline, gridOutline, listOutline, personOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LoadingComponent } from "../../../Core/loading/loading.component";


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  imports: [IonRefresherContent, IonRefresher, IonChip, IonIcon,
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,

    TranslateModule, LoadingComponent]
})
export class AppointmentDetailsComponent implements OnInit {

  appointment!: ExtendedServiceAppointmentModel;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    public service: SpecialistService
  ) {
    addIcons({ personOutline, constructOutline, calendarOutline, alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, listOutline, gridOutline });

  }

  refresh(event: any): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const lang = localStorage.getItem('selectedLanguage') || 'en';

    this.service.getAppointmentById(id).subscribe({
      next: res => {
        this.appointment = {
          ...res.data,
          parsedServiceName: this.getLocalizedServiceName(res.data.serviceNameJson, lang)
        };
        event.target.complete(); // ✅ تموم کردن انیمیشن رفرش
      },
      error: () => {
        event.target.complete(); // حتی در خطا هم انیمیشن متوقف شه
      }
    });
  }



  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const lang = localStorage.getItem('selectedLanguage') || 'en';

    this.service.getAppointmentById(id).subscribe({
      next: res => {
        this.appointment = {
          ...res.data,
          parsedServiceName: this.getLocalizedServiceName(res.data.serviceNameJson, lang)
        };
        this.isLoading = false;
      },
      error: () => this.isLoading = false
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


}
