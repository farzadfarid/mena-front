import { Component, OnInit } from '@angular/core';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import {
  IonButton,
  IonContent, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonList, IonItem, IonThumbnail, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { Router } from '@angular/router';
import { SearchSpecialistsComponent } from "../search-specialists/search-specialists.component";
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { gridOutline, listOutline, searchOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment.development';
import { SkillModel } from 'src/app/Core/Models/Specialists/specialistService.model';


@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonCard, CommonModule, IonBadge, IonCardHeader, IonList, IonIcon, IonLabel, IonItem, IonThumbnail, IonCardTitle, TranslateModule,
    IonButton, FormsModule, LoadingComponent, SearchSpecialistsComponent]
})
export class SpecialistsComponent implements OnInit {

  currentLang = 'en';
  specialists: any[] = [];
  filteredSpecialists: any[] = [];
  currentPage: number = 1;
  specialistsPerPage: number = 8;
  isLoading = false;
  hasSearched = false;
  viewMode: 'list' | 'grid' = 'list';
  searchHeight: number = 170;
  showNoFoundMessage: boolean = false;
  lastServiceIds: number[] = [];
  lastAtDates: string[] = [];
  constructor(private message: ToastService, private specialistService: SpecialistService, private router: Router) {
    addIcons({ gridOutline, listOutline, searchOutline });

  }


  imageUrl = environment.imageUrl;

  updateSearchHeight(height: number) {
    this.searchHeight = height; // مقدار داینامیک رو ست کن
  }


  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }
  ngOnInit() {
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
  }


  getLocalizedSkillName(skill: SkillModel): any {
    if (skill) {
      return skill?.name?.values?.[this.currentLang] || 'No name';
    }
  }

  onSearch(event: { serviceIds: number[]; atDates: string[] }) {
    this.lastServiceIds = event.serviceIds;
    this.lastAtDates = event.atDates;
    console.log(event.serviceIds, event.atDates);
    this.isLoading = true;
    this.hasSearched = true;

    this.specialistService.getSpecialists(event.serviceIds, event.atDates).subscribe({
      next: (response) => {
        this.isLoading = false;
        const specialists = response.data;
        this.showNoFoundMessage = false;
        this.specialists = specialists;
        this.specialists.map((specialist) => {
          specialist.avatar = this.imageUrl + specialist.avatar;
        });
        console.log(specialists);
        this.currentPage = 1; // reset pagination
        if (!this.specialists || this.specialists.length === 0) {
          this.showNoFoundMessage = true;
        }

      },
      error: () => {
        this.isLoading = false;
        this.message.showError('Error fetching specialists');
      }
    });
  }


  getCurrentPageSpecialists(): any[] {
    if (!this.specialists || this.specialists.length === 0) {
      return [];
    }

    const startIndex = (this.currentPage - 1) * this.specialistsPerPage;
    const endIndex = this.currentPage * this.specialistsPerPage;
    return this.specialists.slice(startIndex, endIndex);
  }




  nextPage() {
    const totalPages = Math.ceil(this.specialists.length / this.specialistsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


  viewSpecialist(id: number) {
    this.router.navigate(['/specialist-detail', id], {
      queryParams: {
        serviceIds: this.lastServiceIds?.join(','),  // ذخیره شده از onSearch
        atDates: this.lastAtDates?.join(',')
      }
    });
  }



}
