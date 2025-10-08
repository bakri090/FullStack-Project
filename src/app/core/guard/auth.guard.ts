import {   CanActivate,  Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn:'root'})

export class authGuard implements CanActivate {

  constructor(private route: Router, private _jwt:JwtHelperService ,private api:AuthService){
  }

  canActivate() {
    const isAuthentecated = this.api.isAuthenticated();
    const token = localStorage.getItem('token');

    if(token && !this._jwt.isTokenExpired(token) && isAuthentecated)
      return true

    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    return this.route.createUrlTree(['auth/login'])
  }

  // let router = inject(Router);

  // if(isAuthentecated)
  //   return true;
  // else{
  //   return router.createUrlTree(['login']);
  // }

};
