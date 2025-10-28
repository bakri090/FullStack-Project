import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent implements OnInit{
lang!:any;
dir!:string;

  constructor(private translate:TranslateService){
      this.lang = localStorage.getItem('lang') ?? 'en';
        translate.get('auth.login.login').subscribe(log =>{
          this.loginName = log
        }
        )
        translate.get('auth.login.register').subscribe(reg =>{
            this.regName = reg
            console.log(this.regName);
          }
        )
        translate.get('erorrs.minlenthForPassError').subscribe(er =>{
    console.log(er)
  });
  }
  loginName!:string;
  regName!:string
  navs:{name:string, icon:string}[]=
  [
    {name:'', icon:'fa-solid fa-right-to-bracket'},
    {name:'', icon:'fa-solid fa-user-plus'}
  ]
ngOnInit(): void {
  this.translate.use(this.lang);
  if(this.lang == 'ar')
    this.dir = 'rtl';
  else
    this.dir = 'ltr';
  console.log(this.navs);
  this.translate.get('auth.login.login').subscribe(log =>{
          this.loginName = log
          console.log(this.loginName);
          this.navs[0].name = log;
        }
        )
        this.translate.get('auth.login.register').subscribe(reg =>{
            this.regName = reg
            console.log(this.regName);
          this.navs[1].name = reg;
          }
        )
}
  changeLang(){
    if(this.lang == 'en'){
      this.lang ='ar';
      this.dir = 'rtl';
    }
    else if(this.lang == 'ar'){
      this.lang = 'en';
      this.dir ='ltr';
    }
    location.reload();
    localStorage.setItem('lang', this.lang);
    this.translate.use(this.lang)
}

}
