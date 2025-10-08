import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, } from 'src/app/core/interfaces/IhttpService';
import { AuthService} from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private _http:AuthService, private messageService: MessageService,
  private spinner: NgxSpinnerService, private _router:Router,private _errorMsg:ErrorMessageService
){
  this.initFormControl();
  this.initFormGroup();
}



  login!:FormGroup;

  email!:FormControl;
  password!:FormControl;

    Summary= this._errorMsg.Summary;
  minlenthError= this._errorMsg.minlenthError;
  minlenthForPassError= this._errorMsg.minlenthForPassError;
  requiredError = this._errorMsg.requiredError;
  passNoMatchError = this._errorMsg.passNoMatchError;
  EmailError = this._errorMsg.EmailError;
  charsOnly = this._errorMsg.charsOnly;

  initFormControl(){
    this.email = new FormControl("",[Validators.required,
      Validators.email]);
    this.password = new FormControl("",[Validators.required,
      Validators.minLength(4)]);
  }

  initFormGroup(){
    this.login = new FormGroup({
      email : this.email,
      password : this.password,
  })
  }

  submit(){
    if(this.login.valid)
      this.SignIn(this.login.value)
    else{
      this.login.markAllAsTouched();
      Object.keys(this.login.controls).
      forEach((c) => this.login.controls[c].markAsDirty())
    }
  }

  SignIn(data:ILogin){
    this.spinner.show();
    this._http.login(data).subscribe({
      next: (result) => {
        if(result.token){
          this.show('success','Success','Hello in your page');
          console.log(result,' hi haha')
          this._router.navigate(['user/home'])
          localStorage.setItem('token',result.token);
          localStorage.setItem('userName',result.username);
          localStorage.setItem('roles',result.roles)
          console.log(result);
        }else{
            console.log(result);
            this.show('error','Error',result.error);
        }
        this.spinner.hide();
      },
      error: (err)=>{
        console.log(err, 'hi');
        this.show('error','Error',err.error);
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
