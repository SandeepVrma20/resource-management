import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequirementDetails } from '../requirementDetails';
import { YesNoList } from '../constants';
import { RequirementService } from '../requirement.service';
import { parse } from 'querystring';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


export interface ExperienceBand {
  value: string;
  viewValue: string;
}

export interface siteList {
  value: string;
  viewValue: string;
}

export interface requirementStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-requirement',
  templateUrl: './register-requirement.component.html',
  styleUrls: ['./register-requirement.component.scss']
})



export class RegisterRequirementComponent implements OnInit  {

  public registerForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  dataList: any;
  public yesNoList = YesNoList;
  showFiller = false;
  preFilledData :any[];
  filteredSkillLists: Observable<any[]>;
  listSkill: string[];
  
  public reqPageData: RequirementDetails = new RequirementDetails();

  //skillCategory :FormControl= new FormControl();
  date = new FormControl(new Date);

  constructor(private _fb: FormBuilder,
    private requirementService: RequirementService,
    private router: Router,
    private route: ActivatedRoute
    ) {

  } // form builder simplify form initialization

ngOnInit() {
    let parameter = this.route.snapshot.paramMap.get('reqId');
    if(null!=parameter){
      this.requirementService.getRequirementListById(parameter)
      .subscribe(dataList => {
        this.dataList  =  dataList;
        this.fillFormData(JSON.parse(dataList));
        }
     );
    }else{
     this.requirementService.getAutoPopulateData()
      .subscribe(preFilledData => {
         this.listSkill=JSON.parse(preFilledData)['skillCategory'];
      this.filteredSkillLists = this.registerForm.controls['skillCategory'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
        });

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
  expBand: ['0-1 yrs'],
  startDate: [new Date(), [<any>Validators.required]],
  reqType: [''],
  reqClass: [''],
  contractor: [''],
  trainee: [''],
  revenueWithinQtr: [''],
  status: ['Open', [<any>Validators.required]],
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
}

 private _filter(value: any): any[] {
  const filterValue = value.toLowerCase();

  return this.listSkill.filter(option => option.toLowerCase().includes(filterValue));
}


status:requirementStatus[]=[
  {value:"Open",viewValue:"Open"},
  {value:"Closed" ,viewValue:"Closed"}
]

site:siteList[]=[
  {value:"Onsite",viewValue:"Onsite"},
  {value:"Offshore" ,viewValue:"Offshore"}
]

expBand: ExperienceBand[] = [
  {value: '0-1 yrs', viewValue: '0-1 yrs'},
  {value: '1-2 yrs', viewValue: '1-2 yrs'},
  {value: '2-3 yrs', viewValue: '2-3 yrs'},
  {value: '3-4 yrs', viewValue: '3-4 yrs'},
  {value: '4-5 yrs', viewValue: '4-5 yrs'},
  {value: '5-6 yrs', viewValue: '5-6 yrs'},
  {value: '6-7 yrs', viewValue: '6-7 yrs'},
  {value: '7-8 yrs', viewValue: '7-8 yrs'},
  {value: '8-9 yrs', viewValue: '8-9 yrs'},
  {value: '9-10 yrs', viewValue: '8-10 yrs'},
  {value: '10-11 yrs', viewValue: '10-11 yrs'},
  {value: '11 + yrs', viewValue: '11 + yrs'}
  
];

fillFormData(datalist){

   // we will initialize our form model here
   this.registerForm = this._fb.group({
   
    id:[datalist.id] ,
    eucRefId: [datalist.eucRefId],
    rgsId:  [datalist.rgsId, [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
    reqId: [datalist.reqId, [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
    account: [datalist.account],
    positionOwner: [datalist.positionOwner, [<any>Validators.required]],
    openDate: [datalist.openDate, [<any>Validators.required]],
    site: [datalist.site],
    location: [datalist.location],
    position: [datalist.position],
    skillCategory: [datalist.skillCategory, [<any>Validators.required]],
    mainSkill: [datalist.mainSkill, [<any>Validators.required]],
    additionalSkill: [datalist.additionalSkill],
    domain: [datalist.domain],
    projectName: [datalist.projectName],
    expBand: [datalist.expBand],
    startDate: [datalist.startDate, [<any>Validators.required]],
    reqType: [datalist.reqType],
    reqClass: [datalist.reqClass],
    contractor: [datalist.contractor],
    trainee: [datalist.trainee],
    revenueWithinQtr: [datalist.revenueWithinQtr],
    status: [datalist.status, [<any>Validators.required]],
    employeeId: [datalist.employeeId],
    resourceName: [datalist.resourceName],
    closedDate: [datalist.closedDate],
    onboardDate: [],
    won: [],
    allocationDate: [],
    through: [],
    closedBy: [datalist.closedBy],
    remarks: [datalist.remarks]
  });
}


  fillDetails(responseMsg) {
    alert(responseMsg.response);
     if (responseMsg.flag === true) {
      this.router.navigate(['/listdetails']);
    }
  }

  save(model: RequirementDetails) {
    if(model.rgsId ==null || model.rgsId ==""){
      alert("Kindly fill the Rgs Id !!!");
    }else if(model.reqId ==null || model.reqId ==""){
      alert("Kindly fill the Requirement Id !!!");
    }else if(model.positionOwner ==null || model.positionOwner ==""){
      alert("Kindly fill the Position Owner !!!");
    }else if(model.startDate ==null ){
      alert("Kindly fill the Start Date !!!");
    }else if(model.openDate ==null ){
      alert("Kindly fill the Open Date !!!");
    }else if(model.mainSkill ==null || model.mainSkill ==""){
      alert("Kindly fill the Main Skill !!!");
    }else if(model.expBand ==null || model.expBand==""){
      alert("Kindly fill the Experience Band !!!");
    }else if(model.status ==null || model.status==""){
      alert("Kindly fill the Requirement Status!!!");
    }else {
      this.submitted = true; // set form submit to true
    this.requirementService.createRequirement(model)
      .subscribe(response => {
        this.fillDetails(response);
      });
    }
    // check if model is valid
    // if valid, call API to save requirement
    console.log(model);
  }
}
