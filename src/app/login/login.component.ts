import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../loginDetails';
import { LoginService } from '../login.service';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';


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

     private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn') || 'false' );
     public loginForm: FormGroup;
     dataList: LoginDetails;
     isLoginFail= false;

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

  setLoggedIn(value:boolean){
   this.loggedInStatus=value;
   localStorage.setItem('loggedIn','true');
  }

  getIsLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  login(event) {
    
    event.preventDefault();
    const target= event.target;
    const employeeId=target.querySelector('#employeeId').value;
    const password=target.querySelector('#password').value;
    if(password!="" && employeeId !=""){
      this.dataList= { 'employeeId': employeeId, 'password': password };
      this.loginService.getUserByEmpId(this.dataList)
      .subscribe(response => {
        this.fillDetails(response);
      });
    // check if model is valid
    // if valid, call API to save requirement
    
    }
     
  }

  fillDetails(responseMsg) {
    if (responseMsg.isSuccess == "true") {
     this.loginService.setLoggedIn(true);
     this.router.navigate(['home']);
     localStorage.setItem("firstName",responseMsg.firstName);
     localStorage.setItem("employeeId",responseMsg.employeeId);
     localStorage.setItem("isAdmin",responseMsg.isAdmin);
    }else{
      this.isLoginFail=true;
     }
 }

  registerUser(){
 this.router.navigate(['signup']);
  }

  forgetPassword(){
     this.router.navigate(['forgetPwd']);
  }

}
