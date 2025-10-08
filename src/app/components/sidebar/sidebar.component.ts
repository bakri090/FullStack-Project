import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 constructor(private _http:AuthService){}
navs: {name:string,icon:string}[] =[
  {name:$localize`home`, icon:'fa-solid fa-house-user'}
]
ngOnInit(): void {
  this.isAdmin();
}
isAdmin(){
  if(this._http.isAdmin()){
    this.navs.push(
    { name:$localize`users`,icon:'fa-solid fa-users'});
  }
}
}
