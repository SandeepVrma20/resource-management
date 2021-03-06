import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RequirementService } from '../requirement.service';
import { RequirementDetails } from '../requirementDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { ParsedVariable } from '@angular/compiler';
import { ExcelService } from '../excel.service';
import {RequirementGrpDetails} from '../requirementGrpDetails';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  columnHeadersOrder: string[] = ['rgsId', 'reqId', 'account', 'positionOwner', 'openDate','startDate', 'position', 'skillCategory',
    'mainSkill', 'additionalSkill', 'domain', 'projectName', 'expBand','status','action'];

  dataList: any;
  data: RequirementDetails[]; //any;
  resultsLength: any;
  dataSource = new MatTableDataSource(this.dataList);
  showFiller = false;
  filterDataList : RequirementGrpDetails[];
  username:String;
  isAdmin=true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private requiermentService: RequirementService,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.username=localStorage.getItem('firstName');
    if(null!=localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin")=="false"){
      this.isAdmin =false;
     }
     let filterValue = this.route.snapshot.paramMap.get('filterValue');
    let filterType= this.route.snapshot.paramMap.get('filterType');
   if (filterValue == null && null==filterType) {
      this.requiermentService.getRequirementList()
        .subscribe(dataList => {
          this.dataList = dataList;
          this.fillDetails(JSON.parse(dataList));
        }
        );
    } else {
      this.requiermentService.getRequirementByFilterType(filterType,filterValue)
        .subscribe(dataList => {
           this.dataList  =  dataList;
          //this.dataList = JSON.parse(dataList);
          this.fillDetails(JSON.parse(dataList));
        }
        );
    }
  }

  fillDetails(dataList) {
    this.dataSource = new MatTableDataSource(dataList);
    this.resultsLength = dataList.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadToExcel(): void {
    this.data = JSON.parse(this.dataList);
    this.excelService.exportAsExcelFile(this.data, 'RequirementLists');
  }

  getDetails(rowData) {
    this.router.navigate(['/editreq', rowData]);
  }

  updateReq(rowData){
   let filterTypeValue=this.route.snapshot.paramMap.get('filterType');
    if(null==filterTypeValue){
      filterTypeValue="NA"
    }
    this.router.navigate(['/editreq', rowData.reqId,filterTypeValue]);
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
