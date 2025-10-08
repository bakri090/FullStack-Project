import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from 'src/app/core/interfaces/IhttpService';
import { AuthService} from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
constructor(private _http:AuthService, private messageService: MessageService,
  private spinner: NgxSpinnerService, private _router : Router, private _errorMsg:ErrorMessageService
){
  this.initFormControl();
  this.initFormGroup();
}


  register!:FormGroup;

  firstName!:FormControl;
  lastName!:FormControl;
  userName!:FormControl;
  email!:FormControl;
  password!:FormControl;
  rePassword!:FormControl;

  Summary= this._errorMsg.Summary;
  minlenthError= this._errorMsg.minlenthError;
  minlenthForPassError= this._errorMsg.minlenthForPassError;
  requiredError = this._errorMsg.requiredError;
  passNoMatchError = this._errorMsg.passNoMatchError;
  EmailError = this._errorMsg.EmailError;
  charsOnly = this._errorMsg.charsOnly;

  initFormControl(){
    this.firstName = new FormControl("",[
      Validators.required,Validators.minLength(3),Validators.pattern(/[a-zA-Z]/g)])
    this.lastName = new FormControl("",[
      Validators.required,Validators.minLength(3),Validators.pattern(/[a-zA-Z]/g)])
    this.email = new FormControl("",[Validators.required,
      Validators.email])
    this.userName = new FormControl("",[Validators.required,
      Validators.minLength(3)])
    this.password = new FormControl("",[Validators.required,
      Validators.minLength(4)])
    this.rePassword = new FormControl("", [
      Validators.required, Validators.minLength(4),
      this.passwordVerfy(this.password)
    ]
    )
  }

  initFormGroup(){
    this.register = new FormGroup({
      firstName : this.firstName,
      lastName : this.lastName,
      userName : this.userName,
      email : this.email,
      password : this.password,
      rePassword : this.rePassword
  })
  }

  passwordVerfy(pass:AbstractControl) : ValidatorFn{
  return (rePass:AbstractControl): null | {[key:string]: boolean} => {
    if(pass.value !== rePass.value )
      return {passnotmatch:true};
    else
      return null;
  }}

  submit(){
    if(this.register.valid)
      this.registerationApi(this.register.value)
    else{
      this.register.markAllAsTouched();
      Object.keys(this.register.controls).
      forEach((c) => this.register.controls[c].markAsDirty())
      console.log(this.register);
    }
  }

  registerationApi(data:IRegister){
    this.spinner.show();
      console.log('hi')
    this._http.register(data).
    subscribe({
      next: (res) => {
        console.log(res)
        if(res.id){
          this.show('success','Success','Regesterd completed');
          let {email, password} = res;
          this._http.login({email,password}).subscribe((next) => {
            console.log(next);
            localStorage.setItem('token',next.token);
            localStorage.setItem('userName',next.username);
            this._router.navigate(['user/home']);
          });
          console.log('haha');
        }
        this.spinner.hide();
      },
      error: (err)=>{
        console.log(err);
        this.show('error','Error',err.error.message);
        this.spinner.hide();
      }
    });
  }

  show(severity:string,summary:string,detail:string) {
        this.messageService.add({
          severity: severity,
            summary: summary,
            detail:  detail});
    }
}
