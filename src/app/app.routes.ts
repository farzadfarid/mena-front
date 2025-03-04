import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full'
  },
  {
    path: 'inbox',
    loadComponent: () => import('./Features/inbox/inbox.component').then(m => m.InboxComponent)
  },
  {
    path: 'inbox2',
    loadComponent: () => import('./Features/inbox2/inbox2.component').then(m => m.Inbox2Component)
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
