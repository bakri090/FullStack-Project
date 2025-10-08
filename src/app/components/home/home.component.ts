import { Component } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _userData:UserDataService){}
  ngOnInit(){
    this.getName();
  }

userName:string= ''
getName() {
  this.userName=String(localStorage.getItem('userName'));
}
}
