import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { MessageService } from 'primeng/api';
import { AuthNavComponent } from 'src/app/components/auth-nav/auth-nav.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { MessagesModule } from 'primeng/messages';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'تسجيل', redirectTo: 'register', pathMatch: 'full' },
      { path: 'تسجيل الدخول', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthNavComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    NgxSpinnerModule,
    AutoFocusModule,
    InputTextModule,
    TableModule,
    SharedModule
],
exports:[
RouterModule
],
providers:[
  MessageService
]
})
export class AuthLayoutModule { }
