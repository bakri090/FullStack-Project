import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent {
navs:{name:string, icon:string}[]=
[
  {name:$localize`login`, icon:'fa-solid fa-right-to-bracket'},
  {name:$localize`register`, icon:'fa-solid fa-user-plus'}
]
}
