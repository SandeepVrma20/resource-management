import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequirementDetails } from '../requirementDetails';
import { YesNoList } from '../constants';
import { RequirementService } from '../requirement.service';
import { parse } from 'querystring';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register-requirement',
  templateUrl: './register-requirement.component.html',
  styleUrls: ['./register-requirement.component.scss']
})
export class RegisterRequirementComponent implements OnInit {

  public registerForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  public yesNoList = YesNoList;

  public reqPageData: RequirementDetails = new RequirementDetails();

  date = new FormControl(new Date());

  constructor(private _fb: FormBuilder,
    private requirementService: RequirementService,
    private router: Router) {

  } // form builder simplify form initialization

  ngOnInit() {
    // we will initialize our form model here
    this.registerForm = this._fb.group({
      id: [''],
      eucRefId: [''],
      rgsId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      reqId: ['', [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
      account: [''],
      positionOwner: ['', [<any>Validators.required]],
      openDate: [new Date(), [<any>Validators.required]],
      site: [''],
      location: [''],
      position: [''],
      skillCategory: ['', [<any>Validators.required]],
      mainSkill: ['', [<any>Validators.required]],
      additionalSkill: [''],
      domain: [''],
      projectName: [''],
      expBand: [''],
      startDate: [new Date(), [<any>Validators.required]],
      reqType: [''],
      reqClass: [''],
      contractor: [''],
      trainee: [''],
      revenueWithinQtr: [''],
      status: ['', [<any>Validators.required]],
      employeeId: [],
      resourceName: [],
      closedDate: [],
      onboardDate: [],
      won: [],
      allocationDate: [],
      through: [],
      closedBy: [],
      remarks: []
    });
  }

  fillDetails(responseMsg) {
    alert(responseMsg.response);
    // alert(responseMsg.reqId);
    // alert(responseMsg.flag);
    if (responseMsg.flag === true) {
      this.router.navigate(['/listdetails']);
    }
  }

  save(model: RequirementDetails, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.requirementService.createRequirement(model)
      .subscribe(response => {
        this.fillDetails(response);
      });
    // check if model is valid
    // if valid, call API to save requirement
    console.log(model, isValid);
  }
}
