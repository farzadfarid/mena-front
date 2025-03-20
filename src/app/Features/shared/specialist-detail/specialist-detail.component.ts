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

@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.scss'],
  standalone: true,
  imports: [IonIcon, IonList, IonItem, IonLabel, IonContent,
    IonCard, IonBadge, CommonModule, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, LoadingComponent]
})
export class SpecialistDetailComponent implements OnInit {

  specialist: any;
  isLoading = false;

  constructor(private router: Router, private route: ActivatedRoute, private specialistService: SpecialistService) {
    addIcons({ arrowBack, star, downloadOutline, calendarOutline, personAddOutline });
  }

  ngOnInit() {
    this.isLoading = true;
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null) {
      console.error('Invalid ID in route');
      this.isLoading = false;
      return;
    }

    console.log('Requested specialist id:', id);

    this.specialistService.getSpecialistById(id).subscribe({
      next: (specialist) => {
        console.log('Specialist found:', specialist);

        // اطمینان از اینکه skills یک آرایه است
        if (specialist?.skills && typeof specialist.skills === 'string') {
          specialist.skills = specialist.skills.split(',').map((skill: string) => skill.trim());
        }

        this.specialist = specialist;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching specialist:', err);
        this.isLoading = false;
      }
    });
  }

  downloadCV() {
    if (this.specialist?.cv) {
      window.open(this.specialist.cv, '_blank');
    } else {
      alert('CV not available');
    }
  }

  goBack() {
    this.router.navigate(['/specialists']);
  }
}
