import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/chat';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {





  }
  goSelectPage() {
    this.router.navigateByUrl('/select-company-or-personal')
  }


  goSpecialistPage() {
    this.router.navigateByUrl('/register-specialist')

  }

  specialist() {
    this.router.navigateByUrl('/specialists')
  }
}
