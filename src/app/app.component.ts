import { Component } from '@angular/core';
import { MainComponent } from "./Layout/main/main.component";
import { SpecialistService } from './Core/Services/specialist.service';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [MainComponent, IonicModule]
})
export class AppComponent {
  servicesEn: { id: number; name: string }[] = [];
  servicesSv: { id: number; name: string }[] = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private specialistService: SpecialistService) {

  }



  ngOnInit(): void {
    this.specialistService.getAllServicesAndSaveInTheLocalStorage().subscribe({
      next: (services) => {
        this.servicesEn = this.specialistService.getServicesByLanguage('en');
        this.servicesSv = this.specialistService.getServicesByLanguage('sv');
        // console.log('✅ servicesEn:', this.servicesEn);
        // console.log('✅ servicesSv:', this.servicesSv);
      },
      error: (err) => {
        console.error('❌ Failed to fetch and store services:', err);
      }
    });
  }
}
