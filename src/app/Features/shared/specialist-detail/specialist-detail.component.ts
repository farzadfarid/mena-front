import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import {
  IonButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge,
  IonTitle, IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/Core/loading/loading.component';
import { addIcons } from 'ionicons';
import { arrowBack, star, downloadOutline, calendarOutline, personAddOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment.development';
import { SkillModel } from 'src/app/Core/Models/Specialists/specialistService.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.scss'],
  standalone: true,
  imports: [IonIcon, IonList, IonItem, IonLabel, IonContent,
    IonCard, IonBadge, CommonModule, IonCardHeader, IonCardTitle, IonCardContent, TranslateModule,
    IonButton, LoadingComponent]
})
export class SpecialistDetailComponent implements OnInit {

  specialist: any;
  isLoading = false;
  currentLang = 'en';
  imageUrl = environment.imageUrl;
  fileUrl = environment.imageUrl;
  constructor(private router: Router, private route: ActivatedRoute, private specialistService: SpecialistService) {
    addIcons({ arrowBack, star, downloadOutline, calendarOutline, personAddOutline });
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    this.isLoading = true;
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null) {
      console.error('Invalid ID in route');
      this.isLoading = false;
      return;
    }

    this.specialistService.getSpecialistById(id).subscribe({
      next: (response) => {
        console.log('Specialist data:', response.data);
        this.specialist = response.data;
        this.specialist.avatar = this.imageUrl + this.specialist.avatar;
        this.specialist.resume = this.fileUrl + this.specialist.resume;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching specialist:', err);
        this.isLoading = false;
      }
    });
  }

  downloadCV() {
    if (this.specialist?.resume) {
      window.open(this.specialist.resume, '_blank');
    } else {
      alert('CV not available');
    }
  }

  goBack() {
    this.router.navigate(['/specialists']);
  }


  getLocalizedSkillName(skill: SkillModel): any {
    if (skill) {
      return skill?.name?.values?.[this.currentLang] || 'No name';
    }
  }

  getLocalizedDescription(): string {
    const desc = this.specialist?.description?.values;
    return desc?.[this.currentLang] || desc?.en || desc?.sv || 'No description';
  }


}
