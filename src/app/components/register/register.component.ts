import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from 'src/app/core/interfaces/IhttpService';
import { AuthService} from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent {
constructor(private _http:AuthService, private messageService: MessageService,
  private spinner: NgxSpinnerService, private _router : Router,
  private _errorMsg:ErrorMessageService, private translate:TranslateService
){
  if(localStorage.getItem('lang') == 'ar')
    this.dir = 'rtl';
  else
    this.dir = 'ltr';
  this.initFormControl();
  this.initFormGroup();
  translate.get('erorrs.Summary').subscribe((er) => {
    console.log(er)
    this.Summary = er;
  });
  translate.get('erorrs.minlenthError').subscribe(er => {
    this.minlenthError = er;
  });
  translate.get('erorrs.minlenthForPassError').subscribe(er =>{
    this.minlenthForPassError = er;
    console.log(er);
  });
  translate.get('erorrs.requiredError').subscribe(er => {
    this.requiredError = er;
  })
  translate.get('erorrs.passNoMatchError').subscribe(er => {
    this.passNoMatchError = er;
  });
  translate.get('erorrs.charsOnly').subscribe(er => {
    this.charsOnly = er;
  })
  translate.get('erorrs.emailError').subscribe(er => {
    this.EmailError =er;
  })
}


  register!:FormGroup;

  firstName!:FormControl;
  lastName!:FormControl;
  userName!:FormControl;
  email!:FormControl;
  password!:FormControl;
  rePassword!:FormControl;

  Summary!:string;
  minlenthError!:string;
  minlenthForPassError!:string;
  requiredError!:string;
  passNoMatchError!:string;
  EmailError!:string;
  charsOnly!:string;

  dir!:string;

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
