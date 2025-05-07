import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastService } from '../Services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { RolesEnumType } from '../enums/roles.enum';


export const shareGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);
  const translate = inject(TranslateService);

  const selectedLang = localStorage.getItem('selectedLanguage') || 'en';
  translate.use(selectedLang);

  const allowedRoles = route.data['roles'] as RolesEnumType[]; // ✅ اینجا تبدیل تایپ

  const hasAccess = authService.hasRole(...allowedRoles);

  if (!hasAccess) {
    toast.showError(translate.instant('auth.not_authorized'));
    router.navigate(['/select-company-or-personal']);
    return false;
  }

  return true;
};
