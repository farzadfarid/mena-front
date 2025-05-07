import { Routes } from '@angular/router';
import { shareGuard } from './Core/guards/share.guard';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./Features/home/home.component').then(m => m.HomeComponent),
    data: { title: 'APP_TITLE' }
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
    data: { title: 'Specialists' }
  },



  {
    path: 'chat',
    loadComponent: () => import('./Features/chat-room/chat-room.component').then(m => m.ChatRoomComponent),
    data: { title: 'Chat' }
  },





  {
    path: 'appointments/details/:id',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/appointment-details/appointment-details.component').then(m => m.AppointmentDetailsComponent),
    data: { title: 'Appointments details', roles: ['specialist'] },
  },
  {
    path: 'todo',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/States/to-do/to-do.component').then(m => m.ToDoComponent),
    data: { title: 'To do', roles: ['specialist'] },
  },
  {
    path: 'requests',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/States/requests/requests.component').then(m => m.RequestsComponent),
    data: { title: 'Requests', roles: ['specialist'] },
  },
  {
    path: 'completed',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/States/completed/completed.component').then(m => m.CompletedComponent),
    data: { title: 'Completed', roles: ['specialist'] },
  },
  {
    path: 'archive',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/States/archive-services/archive-services.component').then(m => m.ArchiveServicesComponent),
    data: { title: 'Archive', roles: ['specialist'] },
  },
  {
    path: 'off-days-manager',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Specialist/off-days-manager/off-days-manager.component').then(m => m.OffDaysManagerComponent),
    data: { title: 'Off Days Manager', roles: ['specialist'] }
  },








  {
    path: 'todo-customer',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Customers/States/to-do/to-do.component').then(m => m.ToDoComponent),
    data: { title: 'To do', roles: ['realcustomer', 'legalcustomer'] },
  },
  {
    path: 'requests-customer',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Customers/States/requests/requests.component').then(m => m.RequestsComponent),
    data: { title: 'Requests', roles: ['realcustomer', 'legalcustomer'] },
  },
  {
    path: 'completed-customer',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Customers/States/completed/completed.component').then(m => m.CompletedComponent),
    data: { title: 'Completed', roles: ['realcustomer', 'legalcustomer'] },
  },
  {
    path: 'archive-customer',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/Customers/States/archive-services/archive-services.component').then(m => m.ArchiveServicesComponent),
    data: { title: 'Archive', roles: ['realcustomer', 'legalcustomer'] },
  },







  {
    path: 'dashboard',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/shared/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { title: 'Dashboard', roles: ['specialist', 'realcustomer', 'legalcustomer'] },
  },
  {
    path: 'settings',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/shared/settings/settings.component').then(m => m.SettingsComponent),
    data: { title: 'Settings', roles: ['specialist', 'realcustomer', 'legalcustomer'] },
  },
  {
    path: 'changePassword',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/shared/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    data: { title: 'Change Password', roles: ['specialist', 'realcustomer', 'legalcustomer'] },
  },
  {
    path: 'deleteAccount',
    canActivate: [shareGuard],
    loadComponent: () => import('./Features/shared/delete-account/delete-account.component').then(m => m.DeleteAccountComponent),
    data: { title: 'Delete Account', roles: ['specialist', 'realcustomer', 'legalcustomer'] },
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
