import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  {
    path: `auth`,
    title:'auth',
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      )
  },{
    path: `auth/اضافة مستخدم`,
    title:'auth',
    redirectTo: 'auth/register',
    pathMatch:'full'
  },
  {
    path: `auth/تسجيل الدخول`,
    title:'auth',
    redirectTo: 'auth/login',
    pathMatch:'full'
  },
  {
    path: 'user',
    title: 'user',
    loadChildren: () =>
      import('./layouts/user-layout/user-layout-module.module').then(
        (m) => m.UserLayoutModule
      ),
    canActivate: [authGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
