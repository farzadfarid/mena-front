import { CommonModule, formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSelect, IonDatetime, IonContent, IonGrid, IonRow, IonCol,
  IonModal, IonButton, IonSelectOption, IonBadge, IonIcon
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { createOutline, calendarOutline } from 'ionicons/icons';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';

@Component({
  selector: 'app-search-specialists',
  templateUrl: './search-specialists.component.html',
  styleUrls: ['./search-specialists.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [IonIcon, IonBadge, IonSelect, IonDatetime, IonButton, TranslateModule,
    IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, IonSelectOption, IonModal]
})
export class SearchSpecialistsComponent implements OnInit {

  services: { id: number; name: string }[] = [];
  selectedServiceIds: number[] = [];
  selectedServiceNames: string[] = [];


  selectedDates: string[] = [];
  showEditMode: boolean = false;
  isSearchPanelFixed: boolean = true;

  @Output() searchEvent = new EventEmitter<{ serviceIds: number[]; atDates: string[] }>();
  @ViewChild('searchContainer', { static: false }) searchContainer!: ElementRef;
  @Output() searchHeightChange = new EventEmitter<number>();
  private resizeObserver!: ResizeObserver;

  constructor(private specialistService: SpecialistService) {
    addIcons({ createOutline, calendarOutline });
  }

  ngOnInit(): void {
    const lang = (localStorage.getItem('selectedLanguage') ?? 'en') as 'en' | 'sv';
    this.loadServices(lang);
  }

  loadServices(lang: 'en' | 'sv'): void {
    const localServices = this.specialistService.getServicesByLanguage(lang);

    if (!localServices || localServices.length === 0) {
      console.warn('⚠️ No services found in localStorage, trying to fetch from server...');
      this.specialistService.getAllServicesAndSaveInTheLocalStorage().subscribe({
        next: () => {
          this.services = this.specialistService.getServicesByLanguage(lang);
        },
        error: err => {
          console.error('❌ Failed to load services from API:', err);
        }
      });
    } else {
      this.services = localServices;
      console.log('✅ Services loaded from localStorage');
    }
  }


  onDateChange(event: any) {
    this.selectedDates = event.detail.value;

  }

  emitSearchHeight() {
    if (this.searchContainer) {
      const height = this.searchContainer.nativeElement.offsetHeight;
      this.searchHeightChange.emit(height - 70);
    }
  }

  getSelectedServiceNames(): string[] {
    return this.selectedServiceIds.map(id => {
      const service = this.services.find(s => s.id === id);
      return service ? service.name : '';
    });
  }



  search() {
    this.showEditMode = true;
    this.emitSearchHeight();

    const formattedDates = this.selectedDates.map(date =>
      formatDate(date, 'yyyy-MM-dd', 'en-US')
    );

    this.searchEvent.emit({
      serviceIds: this.selectedServiceIds,
      atDates: formattedDates
    });
  }


  enableEditMode() {
    this.showEditMode = false;
    this.emitSearchHeight();
  }

  ngAfterViewInit() {
    if (this.searchContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.emitSearchHeight();
      });
      this.resizeObserver.observe(this.searchContainer.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
