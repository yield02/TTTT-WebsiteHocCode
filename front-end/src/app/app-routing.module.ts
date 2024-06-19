import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./pages/learning/learning.module').then(m => m.LearningModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then(m => m.ForumModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'myactivities',
    loadChildren: () => import('./pages/myactivities/myactivities.module').then(m => m.MyActivitiesModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
