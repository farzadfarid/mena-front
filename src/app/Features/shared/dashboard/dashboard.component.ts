import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/Core/Services/auth.service';
import {
  checkmarkDoneOutline,
  helpOutline,
  checkmarkOutline,
  archive,
  build,
  people,
  construct,
  calendar,
  business,
  settings,
  calendarOutline
} from 'ionicons/icons';
import { SpecialistService } from 'src/app/Core/Services/specialist.service';
import { ServiceAppointmentStateCode } from 'src/app/Core/enums/ServiceAppointmentStateCode.enum';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { CustomerService } from 'src/app/Core/Services/customer.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterModule, IonicModule, LoadingComponent],
})
export class DashboardComponent implements OnInit {

  userRole: string = 'User'; // This should be dynamically set based on authentication
  serviceCounts: { [key: number]: number } = {};
  serviceCountsCustomer: { [key: number]: number } = {};
  isLoading = false;
  constructor(public authService: AuthService, private router: Router, private serviceAppointmentService: SpecialistService, private serviceAppointmentCustomer: CustomerService) {
    addIcons({
      'checkmark-done-outline': checkmarkDoneOutline,
      'help-outline': helpOutline,
      'checkmark-outline': checkmarkOutline,
      'archive': archive,
      'build': build,
      'people': people,
      'construct': construct,
      'calendar': calendar,
      'business': business,
      'settings': settings,
      'calendar-outline': calendarOutline
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.loadCounts();
  }
  loadCounts() {
    this.isLoading = true;
    const states = [
      ServiceAppointmentStateCode.New,
      ServiceAppointmentStateCode.Confirmed,
      ServiceAppointmentStateCode.Rejected,
      ServiceAppointmentStateCode.CanceledByCustomer,
      ServiceAppointmentStateCode.CanceledBySpecialist,
      ServiceAppointmentStateCode.Done
    ];

    this.serviceAppointmentService.getServiceAppointmentCounts(states).subscribe(response => {
      this.isLoading = false;
      this.serviceCounts = {};
      for (const item of response.data) {
        this.serviceCounts[item.state] = item.count;
      }
      console.log('this.serviceCounts', this.serviceCounts)

    });

    this.serviceAppointmentCustomer.getServiceAppointmentCounts(states).subscribe(response => {
      this.isLoading = false;
      this.serviceCountsCustomer = {};
      for (const item of response.data) {
        this.serviceCountsCustomer[item.state] = item.count;
      }
      console.log('this.serviceCountsCustomer', this.serviceCountsCustomer)

    });
  }


  getArchiveCount(): number {
    const counts = this.serviceCounts;
    return (counts[3] || 0) + (counts[4] || 0) + (counts[5] || 0);
  }
  getArchiveCountCustomer(): number {
    const counts = this.serviceCountsCustomer;
    return (counts[3] || 0) + (counts[4] || 0) + (counts[5] || 0);
  }
}
