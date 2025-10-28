import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { JwtModule } from '@auth0/angular-jwt';
import { authGuard } from './core/guard/auth.guard';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserLayoutModule } from './layouts/user-layout/user-layout-module.module';
import { FooterComponent } from './layouts/footer-layout/footer.component';
import { TestComponent } from './components/test/test.component';
import { SharedModule } from './components/shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthLayoutModule,
    UserLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7273'],
        disallowedRoutes:[]
      }
    }),
    SharedModule
  ],
  exports:[
    TranslateModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    authGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
