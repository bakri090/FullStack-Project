import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent {
  constructor(private _http:AuthService,private translate:TranslateService,private httpProfile:ProfileService){
    httpProfile.getProfile().subscribe({
      next:(res) => {
        this.profileImg = `https://localhost:7273/${res.profileImageUrl}`;
      },
      error:(er) => {
        // if(typeof this.profileImg == 'undefined')
        // this.profileImg  =`assets/images/unknown.png`
      }
    })
  }
  profileImg:string =`assets/images/unknown.png`;
  dir!:string;
  lang:string = String(localStorage.getItem('lang'));
  @Output()TransferDir:EventEmitter<string> = new EventEmitter<string>();
navs: {name:string,icon:string}[] =[
]
  ngOnInit(): void {
  this.translate.get('user.nav.home').subscribe((home) => {
      this.navs.push({name:home, icon:'fa-solid fa-house-user'})
      console.log(home);
    });
    if(this._http.isAdmin()){
  this.translate.get('user.nav.users').subscribe((users) => {
    this.navs.push(
    { name:users,icon:'fa-solid fa-users'});
    });
  }
}
// isAdmin(user:string){

//   }
// }
logout(){
  this._http.logout();
}
ChangeLang(){
  if(this.lang == 'ar'){
    this.lang = 'en';
    this.dir = 'ltr';
  }else{
    this.lang = 'ar';
    this.dir = 'rtl';
  }
  // location.reload()
  localStorage.setItem('lang',this.lang);
  this.translate.use(this.lang);
  this.TransferDir.emit(this.dir);
}
}
