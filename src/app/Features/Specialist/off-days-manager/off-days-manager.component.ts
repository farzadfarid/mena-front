import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { IonContent, IonLabel, IonToggle, IonDatetime, IonButton, IonItem } from "@ionic/angular/standalone";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-off-days-manager',
  templateUrl: './off-days-manager.component.html',
  styleUrls: ['./off-days-manager.component.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonDatetime, IonToggle, TranslateModule, IonLabel, IonContent, CommonModule, LoadingComponent],

})
export class OffDaysManagerComponent {
  isLoading = false;
  offDays: Date[] = []; // yyyy-mm-dd
  selectedDates: string[] = [];
  specialistId!: number;
  @ViewChild('calendar', { static: true }) calendarRef!: ElementRef;
  //offDays: Date[] = [];
  constructor(private specialistService: SpecialistService, private message: ToastService) { }

  formatDateToLocalYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  onDateChange(event: any) {
    this.selectedDates = event.detail.value;
  }



  loadOffDays(): void {
    this.isLoading = true;

    this.specialistService.getOffDays(this.specialistId).subscribe({
      next: (response) => {
        const days = response.data; // ✅ گرفتن فقط آرایه تاریخ‌ها

        this.offDays = days.map((dateStr: string) => new Date(dateStr));
        this.selectedDates = this.offDays.map(d => this.formatDateToLocalYYYYMMDD(d));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading off days:', err);
        this.isLoading = false;
        this.message.showError('Error loading off days.');
      }
    });
  }




  ngOnInit(): void {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        this.specialistId = userInfo.userId;
        this.loadOffDays();
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
      }
    }
  }

  getUpcomingWeekends(startDate: Date, months: number): string[] {
    const result: string[] = [];
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + months, 0); // Last day of the month

    let current = new Date(startDate);

    while (current <= endDate) {
      const day = current.getDay(); // 0=Sunday, 6=Saturday
      if (day === 0 || day === 6) {
        const iso = current.toISOString().split('T')[0]; // yyyy-MM-dd
        result.push(iso);
      }
      current.setDate(current.getDate() + 1);
    }

    return result;
  }

  toggleWeekends(event: any) {
    const isChecked = event.target.checked;
    const today = new Date();
    const weekendDays = this.getUpcomingWeekends(today, 12); // string[] in yyyy-MM-dd

    if (isChecked) {
      const merged = Array.from(new Set([...this.selectedDates, ...weekendDays]));
      this.selectedDates = merged;
    } else {
      this.selectedDates = this.selectedDates.filter(date => !weekendDays.includes(date));
    }

    this.offDays = this.selectedDates.map(dateStr => new Date(dateStr));
  }

  addWeekendOffDays() {
    const today = new Date();
    const weekendDays = this.getUpcomingWeekends(today, 12);
    const merged = Array.from(new Set([...this.selectedDates, ...weekendDays]));
    this.selectedDates = merged;
    this.offDays = this.selectedDates.map(dateStr => new Date(dateStr));
  }


  submit() {
    this.isLoading = true;
    this.specialistService.updateOffDays(this.specialistId, this.selectedDates).subscribe({
      complete: () => {
        this.isLoading = false;
        this.message.showSuccess('Off days saved successfully.');
      },
      error: err => {
        this.isLoading = false;
        this.message.showError('Error saving off days:');
      }
    });


  }

}