import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequirementDetails } from '../requirementDetails';
import { YesNoList } from '../constants';
import { RequirementService } from '../requirement.service';
import { parse } from 'querystring';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-requirements',
  templateUrl: './update-requirements.component.html',
  styleUrls: ['./update-requirements.component.scss']
})
export class UpdateRequirementsComponent implements OnInit {
  

  public registerForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  dataList: RequirementDetails;
  public yesNoList = YesNoList;
  isAdmin=true;
  username:String;
  public reqPageData: RequirementDetails = new RequirementDetails();

  date = new FormControl(new Date());

  constructor(private _fb: FormBuilder,
    private requirementService: RequirementService,
    private router: Router,
    private route: ActivatedRoute) {
      let parameter = this.route.snapshot.paramMap.get('reqId');
      let filterType= this.route.snapshot.paramMap.get('filterType');
   
      if(null!=parameter){
        this.requirementService.getRequirementListById(parameter)
        .subscribe(dataList => {
          this.dataList  =  dataList;
          this.fillFormData(JSON.parse(dataList));
          });
      }

  } // form builder simplify form initialization

  ngOnInit() {
    this.username=localStorage.getItem('firstName');
    if(null!=localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin")=="false"){
      this.isAdmin =false;
     }
   
  }

fillFormData(datalist){
  // we will initialize our form model here
   this.registerForm= this._fb.group({
    id:[datalist.id],
    rgsId:  [datalist.rgsId, [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
    reqId: [datalist.reqId, [<any>Validators.required, <any>Validators.pattern('[0-9]*')]],
    eucRefId: [datalist.eucRefId],
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

 // this.registerForm.controls['reqId'].disable();
  //this.registerForm.controls['rgsId'].disable();
}


  fillDetails(responseMsg) {
    alert(responseMsg.response);
    if (responseMsg.flag === true) {
      this.router.navigate(['/listdetails']);
    }
  }

  update(model: RequirementDetails) {
   this.submitted = true; // set form submit to true
    this.requirementService.updateRequirement(model)
      .subscribe(response => {
        this.fillDetails(response);
      });
    // check if model is valid
    // if valid, call API to save requirement
    console.log(model);
  }

  backToPrevPage(){
    let filterType=this.route.snapshot.paramMap.get('filterType');
    if(null!=filterType && filterType=='domain'){
      this.router.navigateByUrl('/home/domainWise/domainWise');
    }else if(null!=filterType && filterType=='mainSkill'){
      this.router.navigateByUrl('/home');
    }else if(null!=filterType && filterType=='positionOwner'){
      this.router.navigateByUrl('/home/ownerWise/ownerWise');
    }else if(null!=filterType && filterType=='projectName'){
      this.router.navigateByUrl('/home/projectWise/projectWise');
    }else {
      this.router.navigateByUrl('/home');
    }
   
  }

}
