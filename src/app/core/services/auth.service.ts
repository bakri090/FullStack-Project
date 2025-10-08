import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiRoot, IRegister } from '../interfaces/IhttpService';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/IhttpService';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private _http:HttpClient, private messageService: MessageService,private router:Router) { }

  register(data:IRegister) : Observable<any>{
    return this._http.post(`${apiRoot}\\register`,data);
  }

  login(data:ILogin) : Observable<any> {

    return this._http.post<any>(`${apiRoot}\\login`,data)
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('roles');
  }

isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
isAdmin():boolean {
  return !!localStorage.getItem('roles')?.includes('Admin');
}
  show(severity:string,summary:string,detail:string) {
    this.messageService.add({
      severity: severity,
        summary: summary,
        detail:  detail});
  }
}
