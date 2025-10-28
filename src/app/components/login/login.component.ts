import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, } from 'src/app/core/interfaces/IhttpService';
import { AuthService} from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{
constructor(private _http:AuthService, private messageService: MessageService,
  private translate:TranslateService,private spinner: NgxSpinnerService,
  private _router:Router,private _errorMsg:ErrorMessageService
){
  this.initFormControl();
  this.initFormGroup();
  if(localStorage.getItem('lang') == 'en' )
    this.dir = 'ltr';
  else
    this.dir = 'rtl';
  translate.get('erorrs.Summary').subscribe((er) => {
    console.log(er)
    this.Summary = er;
  });
  translate.get('erorrs.minlenthError').subscribe(er => {
    this.minlenthError = er;
  });
  translate.get('erorrs.requiredError').subscribe(er => {
    this.requiredError = er;
  })
  translate.get('erorrs.emailError').subscribe(er => {
    this.EmailError =er;
  })

  translate.get('erorrs.minlenthForPassError').subscribe(er =>{
    this.minlenthForPassError = er;
    console.log(er);
  });
}

  login!:FormGroup;

  email!:FormControl;
  password!:FormControl;

  dir!:string;
  isValid:boolean = true;
  ngOnInit(): void {
    this.changeLang();
    console.log(this.login.errors)
  }

  changeLang(){
    if(localStorage.getItem('lang') == 'en')
      console.log(true);
    else
      console.log(false);
  }
  Summary!:string;
  minlenthError!:string;
  requiredError!:string;
  EmailError!:string;
  minlenthForPassError!:string;

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
    if(this.login.valid){
      this.SignIn(this.login.value)
    }
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
