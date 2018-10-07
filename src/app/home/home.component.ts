import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { RequirementService } from '../requirement.service';
import { RequirementDetails } from '../requirementDetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columnHeadersOrder: string[] = ['mainSkill', 'count'];
  // dataList:  RequirementDetails[];
  
dataList = [
    {
      'rgsId': 2243367,
      'reqId': 5423932,
      'account': 'ABN Amro',
      'positionOwner': 'Azra',
      'openDate': '25-10-2017',
      'position': 'Database Admin',
      'skillCategory': 'Teradata',
      'mainSkill': 'Teradata',
      'additionalSkill': 'Unix',
      'domain': 'Connectivity & Technology',
      'projectName': 'EDI',
      'expBand': '8-10 yrs',
      'count': '2'
    },
    {
      'rgsId': 2243368,
      'reqId': 5423931,
      'account': 'ABN Amro',
      'positionOwner': 'Hemant',
      'openDate': '24-10-2017',
      'position': 'Java Developer',
      'skillCategory': 'Java',
      'mainSkill': 'Java',
      'additionalSkill': 'Spring',
      'domain': 'Risk',
      'projectName': 'MPS',
      'expBand': '1-2 yrs',
      'count': '5'
    }
  ];

  dataSource = new MatTableDataSource(this.dataList);

  resultsLength = this.dataList.length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private requirementService: RequirementService) {
    
  }
  fillDetails(dataList){
   // this.dataSource = new MatTableDataSource(this.dataList);
    //this.resultsLength = this.dataList.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.requirementService.getGrpRequirement()
    .subscribe(dataList=> {
      this.dataList  =  dataList;
      this.fillDetails(this.dataList);
      console.log(this.dataList);
    }
    )
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(mainSkill: string) {
    // this.router.navigate();
  }

}
