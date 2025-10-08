import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { haveAdminRoleGuard } from 'src/app/core/guard/have-admin-role.guard';

import { UserLayoutComponent } from 'src/app/layouts/user-layout/user-layout.component';
import { UserNavComponent } from 'src/app/components/user-nav/user-nav.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { EditComponent } from 'src/app/components/edit/edit.component';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent, canActivate: [haveAdminRoleGuard] },
      { path: 'home', component: HomeComponent },
      { path: 'edit/:id', component: EditComponent},
      {path:'الصفحة الرئيسية', redirectTo:'home'},
      {path:'المستخدمين', redirectTo:'users'}
    ]
  }
];


@NgModule({
  declarations: [
    UserLayoutComponent,
    UserNavComponent,
    UsersComponent,
    HomeComponent,
    EditComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    NgxSpinnerModule,
    AutoFocusModule,
    InputTextModule,
    TableModule,
    CommonModule
  ],
  exports:[
    RouterModule,
    // SidebarComponent
  ],

  providers:[
    MessageService
  ]
})
export class UserLayoutModule { }
