import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userApi } from '../interfaces/IhttpService';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private _http:HttpClient) { }

  userName:BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('userName') || '');

  getUsers() : Observable<any> {
    return this._http.get<any>(`${userApi}`);
  }
  getById(id:string):Observable<IUser>{
    return this._http.get<IUser>(`${userApi}/${id}`)
  }
  Edit(id:string,edited:IUser):Observable<IUser>{
    return this._http.put<IUser>(`${userApi}/${id}`,edited);
  }
  Delete(id:string):Observable<IUser>{
    return this._http.delete<IUser>(`${userApi}/${id}`);
  }
}
