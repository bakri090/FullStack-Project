import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 constructor(private _http:AuthService,private translate:TranslateService){}
navs: {name:string,icon:string}[] =[
]
ngOnInit(): void {
  this.translate.get('user.nav.home').subscribe((home) => {
    this.navs.push( {name:home, icon:'fa-solid fa-house-user'})
  });

    if(this._http.isAdmin()){
  this.translate.get('user.nav.users').subscribe((users) => {
    this.navs.push(
    { name:users,icon:'fa-solid fa-users'});
    });
  }
}
}
