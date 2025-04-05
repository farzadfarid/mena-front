import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { business, calendar, calendarOutline, construct, people, settings } from 'ionicons/icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterModule, IonicModule],
})
export class DashboardComponent implements OnInit {

  userRole: string = 'User'; // This should be dynamically set based on authentication

  constructor(private router: Router) {
    addIcons({ people, construct, calendar, business, settings,calendarOutline })
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() { }

}
