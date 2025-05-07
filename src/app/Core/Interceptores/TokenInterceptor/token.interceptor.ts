import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../Services/toast.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const translate = inject(TranslateService);
  const message = inject(ToastService)
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // پاک‌سازی توکن و اطلاعات کاربر
        authService.clearAuthData();

        // تنظیم زبان فعلی
        const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
        translate.use(selectedLang);

        // نمایش پیام به زبان مناسب
        const messageKey = 'auth.please_login'; // کلید داخل فایل i18n شما 
        message.showError(translate.instant(messageKey));

        // ریدایرکت به صفحه انتخاب
        router.navigate(['/select-company-or-personal']);
      }

      return throwError(() => error);
    })
  );
};
