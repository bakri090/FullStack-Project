import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/core/interfaces/IhttpService';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

constructor(private _userData:UserDataService,private _router:Router){}
users:IUsers[] =[];

ngOnInit(){
  this.AllUsers();
}
AllUsers(){
  this._userData.getUsers().subscribe( {
    next : us => {
      this.users = us;
      console.log(this.users);
      console.log(this.users.length);
    },
    error: err =>{
      console.log(err);
    }
  });

}
edit(id:string){
    this._router.navigateByUrl(`user/edit/${id}`)
}
Delete(id:string){
  console.log(id);
  this._userData.Delete(id).subscribe({
    next:(next) => {
      console.log(next);
    }
  })
}
}
