import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { LoginDetails } from '../loginDetails';
import { LoginService } from '../login.service';

export interface SecretQuestion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
     }

     public forgetPwdForm: FormGroup;
     dataList: LoginDetails;
     responseMsg =String;
     isResponseGet= false;


  ngOnInit() {
   this.forgetPwdForm=this._fb.group({
      employeeId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      answer:['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      password :['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      confirmPassword :['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      secretQuestion:['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]]
     });

  }

  updatePwd(model:LoginDetails) {
    if(model.password==model.confirmPassword){
     }else{
     alert('password does not match');
   }
   console.log(model);
    this.loginService.forgetPwd(model)
   .subscribe(response => {
     this.fillDetails(response);
    });
   
   }

   fillDetails(responseMsg) {
     console.log(responseMsg.response);
    if (responseMsg.flag == true) {
      this.isResponseGet=true;
       this.responseMsg=responseMsg.response;
       alert(responseMsg.response);
       this.router.navigate(['/login']);
    }else{
      this.isResponseGet=true;
      this.responseMsg=responseMsg.response;
     }
  }

  secretQuestion: SecretQuestion[] = [
    {value: 'What is your nick name ?', viewValue: 'What is your nick name ?'},
    {value: 'What is your pet name ?', viewValue: 'What is your pet name ?'},
    {value: 'What is your school name ?', viewValue: 'What is your school name ?'},
    {value: 'What is your first company name ?', viewValue: 'What is your first company name ?'}
  ];

  Cancle(){
    this.router.navigate(['/login']);
 }

}
