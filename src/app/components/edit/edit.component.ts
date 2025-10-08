import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/iuser';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
constructor(private _active:ActivatedRoute,
  private _http:UserDataService,private _router:Router){
  _active.paramMap.subscribe((param) =>
  {
    let id = String(param.get('id'));
    this.Id= id;
    _http.getById(id).subscribe((us:IUser)=>{
    this.user = us;
    this.patchFormValue();
    console.log(us);
    });
  })
  this.initFormControl();
  this.initFormGroup();
}
  Id!:string;
  user!:IUser;
  register!:FormGroup;
  firstName!:FormControl;
  lastName!:FormControl;
  userName!:FormControl;
  phoneNumber!:FormControl;
  patchFormValue(){
    if(this.user)
    this.register.patchValue({
      firstName: this.user.firstName,
      lastName:this.user.lastName,
      userName:this.user.userName,
      phoneNumber:this.user.phoneNumber
    })
  }
  initFormControl(){
    this.firstName = new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern(/[a-zA-Z]/g)])
    this.lastName = new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern(/[a-zA-Z]/g)])
    this.phoneNumber = new FormControl("",[Validators.required,Validators.pattern(/[0-9]/g)])
    this.userName = new FormControl("",[Validators.required,Validators.minLength(3)])
  }

  initFormGroup(){
    this.register = new FormGroup({
      firstName : this.firstName,
      lastName : this.lastName,
      userName : this.userName,
      phoneNumber : this.phoneNumber,
  })
  }
submit(){
  if(this.register.valid){
    const editedUser:IUser={
      ...this.register.value,
    }
    this._http.Edit(this.Id,editedUser).subscribe({
      next:(data) => {
        this._router.navigateByUrl('user/users');
      },
      error:(er) => {
        console.log(er);
      }
    });
  }
}
}
