import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit{

constructor(private translate:TranslateService) {

  if(localStorage.getItem('lang'))
    this.lang = String(localStorage.getItem('lang'));
  else
    this.lang = 'en';

  if(this.lang == 'en')
    this.dir = 'ltr';
  else
    this.dir = 'rtl';
  console.log(this.lang);
  console.log(this.dir);
  translate.use(this.lang);
  }

  dir!:string;
  lang!:string;
  ngOnInit(): void {
    console.log();
  }
  Direction(Dir:string){
    this.dir=Dir;
    console.log('from user layout');
  }
}
