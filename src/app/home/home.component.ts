import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { RequirementService } from '../requirement.service';
import { RequirementDetails } from '../requirementDetails';
import { RequirementGrpDetails } from '../requirementGrpDetails';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export interface filterCriteria {
  value: string;
  viewValue: string;
}

export interface requirementStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columnHeadersOrder: string[] = ['mainSkill', 'count'];
  dataList: RequirementDetails[];
  dataSource: any;
  resultsLength: any;
  showFiller = false;
  public dashboardForm: FormGroup;
  skillDashboard =true;
  domainDashboard =false;
  ownerDashboard =false;
  projectDashboard =false;
  monthlyDashboard =false;
  customDashboard =false;
  filterDataList : RequirementGrpDetails[];
  dashboardViewSkill =false;
  dashboardViewOwner =false;
  dashboardViewProject =false;
  dashboardViewDomain =false;
  dashboardNoData =false;
  dashboardViewMonthly =false;
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _fb: FormBuilder,
    private requirementService: RequirementService, 
    private router: Router,
    private route: ActivatedRoute,) {

  }
  fillDetails(dataList) {
    this.dataSource = new MatTableDataSource(dataList);
     this.resultsLength = dataList.length;
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
  dashBoardFilter:filterCriteria[]=[
    {viewValue:"Main Skill" ,value:"mainSkill"},
    {viewValue:"Domain",value:"domain"},
    {viewValue:"Project Name",value:"projectName"},
    {viewValue:"Project Owner",value:"positionOwner"}
]

status:requirementStatus[]=[
  {viewValue:"Open" ,value:"Open"},
  {viewValue:"Closed",value:"Closed"}
]

  ngOnInit() {

    let parameter = this.route.snapshot.paramMap.get('filterType');
    if(null!=parameter && parameter=="customFilter"){
    this.customDashboard=true;
    this.skillDashboard =false;
    this.domainDashboard =false;
    this.ownerDashboard =false;
    this.projectDashboard =false;
    this.monthlyDashboard=false;
    this.dashboardForm = this._fb.group({
      account: [''],
      location: [''],
      position: [''],
      startDate: [new Date(), [<any>Validators.required]],
      endDate: [new Date(), [<any>Validators.required]]
      })
     }
     else if(null!=parameter && parameter=="domainWise"){
        this.customDashboard=false;
        this.skillDashboard =false;
        this.domainDashboard =true;
        this.ownerDashboard =false;
        this.projectDashboard =false;
        this.monthlyDashboard=false;
        this.columnHeadersOrder = ['domain', 'count'];
       this.requirementService.getGrpRequirementByDomain()
        .subscribe(dataList => {
      this.dataList = dataList;
      this.fillDetails(JSON.parse(dataList));
    }
    );
     }
     else if(null!=parameter && parameter=="projectWise"){
      this.customDashboard=false;
      this.skillDashboard =false;
      this.domainDashboard =false;
      this.ownerDashboard =false;
      this.projectDashboard =true;
      this.monthlyDashboard=false;
      this.columnHeadersOrder = ['projectName', 'count'];
      this.requirementService.getGrpRequirementByProject()
        .subscribe(dataList => {
      this.dataList = dataList;
      this.fillDetails(JSON.parse(dataList));
    }
    );
   }
   else if(null!=parameter && parameter=="ownerWise"){
    this.customDashboard=false;
    this.skillDashboard =false;
    this.domainDashboard =false;
    this.ownerDashboard =true;
    this.projectDashboard =false;
    this.monthlyDashboard=false;
    this.columnHeadersOrder = ['positionOwner', 'count'];
    this.requirementService.getGrpRequirementByOwner()
        .subscribe(dataList => {
      this.dataList = dataList;
      this.fillDetails(JSON.parse(dataList));
    }
    );
 }else if(null!=parameter && parameter=="monthWise"){
   alert('inside month');
  this.customDashboard=false;
  this.skillDashboard =false;
  this.domainDashboard =false;
  this.ownerDashboard =false;
  this.projectDashboard =false;
  this.monthlyDashboard=true;
  this.columnHeadersOrder = ['projectName', 'count'];
  this.requirementService.getGrpRequirementByMonth()
      .subscribe(dataList => {
    this.dataList = dataList;
    this.fillDetails(JSON.parse(dataList));
  }
  );
}
     else{
      this.customDashboard=false;
      this.skillDashboard =true;
      this.domainDashboard =false;
      this.ownerDashboard =false;
      this.projectDashboard =false;
      this.monthlyDashboard=false;
     this.requirementService.getGrpRequirement()
     .subscribe(dataList => {
      this.dataList = dataList;
      this.fillDetails(JSON.parse(dataList));
    }
    );
   }


// we will initialize our form model here
this.dashboardForm = this._fb.group({
 startDate: [new Date(), [<any>Validators.required]],
 status: ['Open', [<any>Validators.required]],
 closedDate: [new Date(), [<any>Validators.required]],
 dashboardType: ['mainSkill']
});

     
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 getDetails(requirementCount) { 
  if(null!=requirementCount.mainSkill){
  this.router.navigate(['/listdetails', requirementCount.mainSkill ,'mainSkill']);
}else if(null!=requirementCount.domain){
   this.router.navigate(['/listdetails', requirementCount.domain,'domain']);
}else if(null!=requirementCount.projectName){
   this.router.navigate(['/listdetails', requirementCount.projectName,'projectName']);
  } else if(null!=requirementCount.positionOwner){
    this.router.navigate(['/listdetails', requirementCount.positionOwner,'positionOwner']);
  }

   
  }

  save(model:RequirementDetails){
   
    if (model.dashboardType ==null || model.dashboardType==""){
      alert("Kindly fill the filter by dropdown");
    }else if(model.status ==null || model.status ==""){
    alert("Kindly fill the status");
    }else if (model.startDate ==null){
      alert("Kindly fill the Start Date");
    }else if (model.closedDate ==null){
      alert("Kindly fill the End Date");
    }else{
      this.requirementService.getRequirementByCustomFilter(model)
        .subscribe(dataList => {
      this.dataList = dataList.requirementData;
    if(null!=dataList.requirementData){
      if(model.dashboardType=='mainSkill' ){
        this.columnHeadersOrder = ['mainSkill', 'count'];
        this.dashboardViewSkill =true;
        this.dashboardViewDomain =false;
        this.dashboardViewProject =false;
        this.dashboardViewOwner =false;
        this.dashboardNoData =false;
        this.dashboardViewMonthly=false;
      }else if(model.dashboardType=='domain' ){
        this.columnHeadersOrder = ['domain', 'count'];
        this.dashboardViewSkill =false;
        this.dashboardViewDomain =true;
        this.dashboardViewProject =false;
        this.dashboardViewOwner =false;
        this.dashboardNoData =false;
        this.dashboardViewMonthly=false;
      }else if(model.dashboardType=='projectName' ){
        this.columnHeadersOrder = ['projectName', 'count'];
        this.dashboardViewSkill =false;
        this.dashboardViewDomain =false;
        this.dashboardViewProject =true;
        this.dashboardViewOwner =false;
        this.dashboardNoData =false;
        this.dashboardViewMonthly=false;
      }else if(model.dashboardType=='positionOwner' ){
        this.columnHeadersOrder = ['positionOwner', 'count'];
        this.dashboardViewSkill =false;
        this.dashboardViewDomain =false;
        this.dashboardViewProject =false;
        this.dashboardViewOwner =true;
        this.dashboardNoData =false;
        this.dashboardViewMonthly=false;
      }else if(model.dashboardType=='positionOwner' ){
        this.columnHeadersOrder = ['positionOwner', 'count'];
        this.dashboardViewSkill =false;
        this.dashboardViewDomain =false;
        this.dashboardViewProject =false;
        this.dashboardViewOwner =false;
        this.dashboardNoData =false;
        this.dashboardViewMonthly=true;
      }
    this.fillDashboardDetails(dataList.requirementData);
      }else{
        this.dashboardNoData =true;
        this.dashboardViewSkill =false;
        this.dashboardViewDomain =false;
        this.dashboardViewProject =false;
        this.dashboardViewOwner =false;
        this.dashboardViewMonthly=false;
      }
      
    });
    }

   }
  fillDashboardDetails(dataList) {
      this.dataSource = new MatTableDataSource(dataList);
      this.resultsLength = dataList.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

}
