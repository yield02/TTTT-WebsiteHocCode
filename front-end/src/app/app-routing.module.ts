import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuardGuard } from './guard/LoginGuard.guard';
import { MessageService } from 'primeng/api';
import { ErrorComponent } from './pages/error/error.component';





const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then(m => m.ForumModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./pages/learning/learning.module').then(m => m.LearningModule),
    canMatch: [loginGuardGuard],

  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
    canMatch: [loginGuardGuard],

  },
  {
    path: 'myactivities',
    loadChildren: () => import('./pages/myactivities/myactivities.module').then(m => m.MyActivitiesModule),
    canMatch: [loginGuardGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "**",
    pathMatch: 'full',
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MessageService]
})
export class AppRoutingModule {
  constructor() {

  }
}
