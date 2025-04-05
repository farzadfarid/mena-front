import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/Core/Services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { RolesEnum } from 'src/app/Core/enums/roles.enum';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { LoadingComponent } from "../../../Core/loading/loading.component";
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login-specialist',
  templateUrl: './login-specialist.component.html',
  styleUrls: ['./login-specialist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, LoadingComponent]
})
export class LoginSpecialistComponent {

  email = '';
  password = '';
  isLoading = false;
  constructor(public router: Router, private message: ToastService, private authService: AuthService) { }

  async login() {
    console.log('[LOGIN] backend url:', environment.url);

    this.isLoading = true;
    if (this.email === '' && this.password === '') {
      this.message.showError('Invalid email or password!');
      this.isLoading = false;
      return;
    }
    else {
      this.authService.login({ email: this.email, password: this.password, rememberMe: true }).subscribe(res => {
        this.isLoading = false;
        console.log('[LOGIN]', '✅ response:', res);
        if (res.data !== '') {
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

          if (userInfo.role === RolesEnum[RolesEnum.specialist]) {

            this.router.navigate(['/dashboard']);
          }
        }
      })
    }
  }

}
