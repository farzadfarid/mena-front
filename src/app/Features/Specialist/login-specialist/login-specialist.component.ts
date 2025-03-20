import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-specialist',
  templateUrl: './login-specialist.component.html',
  styleUrls: ['./login-specialist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class LoginSpecialistComponent {

  constructor(public router: Router, private message: ToastService) { }
  login() { }
  ngOnInit() { }

}
