import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iuserProfile } from '../interfaces/iuserProfile';
import { userApi } from '../interfaces/IhttpService';
import { updateiuserProfile } from '../interfaces/updateiuserProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  update(data:updateiuserProfile):Observable<string>{
    return this.http.put<string>(`${userApi}/update`,data);
  }
   getProfile() {
    return this.http.get<iuserProfile>(`${userApi}/profile`);
  }
  upload(img:File){
    const from = new FormData();
    from.append('file',img,img.name)
    return this.http.post(`${userApi}/upload`, from);
  }
}
