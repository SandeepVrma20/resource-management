import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../loginDetails';
import { LoginService } from '../login.service';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
     }

     public loginForm: FormGroup;
     dataList: LoginDetails;

  ngOnInit() {

    this.loginForm=this._fb.group({
      employeeId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      firstName: [''],
      lastName: [''],
      email: [''],
      userName: [''],
      password :['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]]
     });

  }

  login(model: LoginDetails) {
    if(model.password!=""){
      this.loginService.getUserByEmpId(model)
      .subscribe(response => {
        this.fillDetails(response);
       });
    // check if model is valid
    // if valid, call API to save requirement
     console.log(model);
    }
     
  }

  fillDetails(responseMsg) {
     if (responseMsg.isSuccess == "true") {
       alert(responseMsg.response);
       this.router.navigate(['']);
    }else{
      alert(responseMsg.response);
    }
  }

}
