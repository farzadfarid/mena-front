import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./Features/home/home.component').then(m => m.HomeComponent),
    data: { title: 'Sign In' }
  },
  {
    path: 'login-companyPersonal',
    loadComponent: () => import('./Features/Customers/login-company-personal/login-company-personal.component').then(m => m.LoginCompanyPersonalComponent),
    data: { title: 'Sign In or Sign Up' }
  },
  {
    path: 'login-specialist',
    loadComponent: () => import('./Features/Specialist/login-specialist/login-specialist.component').then(m => m.LoginSpecialistComponent),
    data: { title: 'Sign In Specialist' }
  },
  {
    path: 'register-specialist',
    loadComponent: () => import('./Features/Specialist/registerSpecialist/registerSpecialist.component').then(m => m.RegisterProfileComponent),
    data: { title: 'Register Specialist' }
  },
  {
    path: 'specialist-property',
    loadComponent: () => import('./Features/Specialist/specialist-property/specialist-property.component').then(m => m.SpecialistPropertyComponent),
    data: { title: 'Specialist Property' }
  },


  {
    path: 'register-company',
    loadComponent: () => import('./Features/Customers/Companies/register-company/register-company.component').then(m => m.RegisterCompanyComponent),
    data: { title: 'Company Register' }
  },
  {
    path: 'register-personal',
    loadComponent: () => import('./Features/Customers/Personal/register-personal/register-personal.component').then(m => m.RegisterPersonalComponent),
    data: { title: 'Client Registry ' }
  },
  {
    path: 'select-company-or-personal',
    loadComponent: () => import('./Features/Customers/select-company-or-personal/select-company-or-personal.component').then(m => m.SelectCompanyOrPersonalComponent),
    data: { title: 'Sign In or Sign Up' }
  },
  {
    path: 'specialists',
    loadComponent: () => import('./Features/shared/specialists/specialists.component').then(m => m.SpecialistsComponent),
    data: { title: 'Service Appointment' }
  },
  {
    path: 'specialist-detail/:id',
    loadComponent: () => import('./Features/shared/specialist-detail/specialist-detail.component').then(m => m.SpecialistDetailComponent),
    data: { title: 'Specialist Detail' }
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Features/shared/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { title: 'Dashboard' }
  },
  {
    path: 'settings',
    loadComponent: () => import('./Features/shared/settings/settings.component').then(m => m.SettingsComponent),
    data: { title: 'Settings' }
  },
  {
    path: 'changePassword',
    loadComponent: () => import('./Features/shared/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    data: { title: 'Change Password' }
  },
  {
    path: 'deleteAccount',
    loadComponent: () => import('./Features/shared/delete-account/delete-account.component').then(m => m.DeleteAccountComponent),
    data: { title: 'Delete Account' }
  },


  //specialist account
  {
    path: 'off-days-manager',
    loadComponent: () => import('./Features/Specialist/off-days-manager/off-days-manager.component').then(m => m.OffDaysManagerComponent),
    data: { title: 'Off Days Manager' }
  },

  {
    path: '**',
    loadComponent: () => import('./Core/Components/notfound/notfound.component').then(m => m.NotfoundComponent),
    data: { title: 'Not Found Page' }
  },





  // {
  //   path: 'outbox',
  //   loadComponent: () => import('./features/outbox/outbox.page').then(m => m.OutboxPage)
  // },
  // {
  //   path: 'favorites',
  //   loadComponent: () => import('./features/favorites/favorites.page').then(m => m.FavoritesPage)
  // },
  // {
  //   path: 'archived',
  //   loadComponent: () => import('./features/archived/archived.page').then(m => m.ArchivedPage)
  // },
  // {
  //   path: 'trash',
  //   loadComponent: () => import('./features/trash/trash.page').then(m => m.TrashPage)
  // },
  // {
  //   path: 'spam',
  //   loadComponent: () => import('./features/spam/spam.page').then(m => m.SpamPage)
  // }
];
