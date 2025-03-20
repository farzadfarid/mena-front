import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-company-personal',
  templateUrl: './login-company-personal.component.html',
  styleUrls: ['./login-company-personal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class LoginCompanyPersonalComponent {

  email = '';
  password = '';

  constructor(public router: Router, private message: ToastService) { }

  async login() {
    if (this.email === 'test@example.com' && this.password === 'password') {
      this.router.navigate(['/home']); // Navigate to home page after login
    } else {

      this.message.showError('Invalid email or password!');

    }
  }

}
