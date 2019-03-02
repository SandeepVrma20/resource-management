import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginDetails } from '../loginDetails';
import {LoginService } from '../login.service';

export interface SecretQuestion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private loginService: LoginService,
   private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.signUpForm=this._fb.group({
      employeeId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      firstName: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      lastName: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      emailId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      phoneNo: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]+[A-Z]?')]],
      answer:['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      password :['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      confirmPassword :['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      secretQuestion:['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]]
     });

  }

  secretQuestion: SecretQuestion[] = [
    {value: 'What is your nick name ?', viewValue: 'What is your nick name ?'},
    {value: 'What is your pet name ?', viewValue: 'What is your pet name ?'},
    {value: 'What is your school name ?', viewValue: 'What is your school name ?'},
    {value: 'What is your first company name ?', viewValue: 'What is your first company name ?'}
  ];

  login(model:LoginDetails) {
     if(model.password==model.confirmPassword){
      }else{
      alert('password does not match');
    }
    console.log(model);
     this.loginService.createUser(model)
    .subscribe(response => {
      this.fillDetails(response);
     });
    
    }

    fillDetails(responseMsg) {
     // alert(responseMsg.response);
      console.log(responseMsg);
      if (responseMsg.flag == true) {
        this.router.navigate(['/login']);
     }
   }
     
    Cancle(){
       this.router.navigate(['/login']);
    }

    
}
