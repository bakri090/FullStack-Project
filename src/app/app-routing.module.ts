import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  {
    path: 'auth',
    title:'auth',
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      )
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
  { path: '**', component: NotFoundComponent, title: 'no found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
