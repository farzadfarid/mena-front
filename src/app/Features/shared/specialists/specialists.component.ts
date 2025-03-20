import { Component, OnInit } from '@angular/core';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import {
  IonButton,
  IonContent, IonCard, IonCardHeader, IonCardTitle, IonBadge
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { Router } from '@angular/router';
import { SearchSpecialistsComponent } from "../search-specialists/search-specialists.component";
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonCard, CommonModule, IonBadge, IonCardHeader, IonCardTitle, TranslateModule,
    IonButton, FormsModule, LoadingComponent, SearchSpecialistsComponent]
})
export class SpecialistsComponent implements OnInit {

  specialists: any[] = [];
  filteredSpecialists: any[] = [];
  searchTerm: string = '';
  searchDate: string = '';
  currentPage: number = 1;
  specialistsPerPage: number = 8;
  isLoading = false;
  hasSearched = false;

  services: any[] = ['Plumbing', 'Carpentry', 'Masonry'];


  constructor(private message: ToastService, private specialistService: SpecialistService, private router: Router) { }

  ngOnInit() {

  }

  filterSpecialists() {
    this.filteredSpecialists = this.specialists
      .filter(specialist =>
        specialist.skills.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice((this.currentPage - 1) * this.specialistsPerPage, this.currentPage * this.specialistsPerPage);
  }

  onSearch(event: { skill: string; date: string }) {
    this.isLoading = true;
    this.searchTerm = event.skill;
    this.searchDate = event.date;
    this.hasSearched = true;

    this.specialistService.getSpecialists(this.searchDate).subscribe((data) => {
      this.isLoading = false;
      if (data.length === 0) {
        this.message.showInfo('No specialists found for the selected date');
      }
      this.specialists = data;
      this.filterSpecialists();
    });
  }
  nextPage() {
    if (this.currentPage * this.specialistsPerPage < this.specialists.length) {
      this.currentPage++;
      this.filterSpecialists();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterSpecialists();
    }
  }

  viewSpecialist(id: number) {
    this.router.navigate(['/specialist-detail', id]);
  }


}
