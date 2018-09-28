import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  columnHeadersOrder: string[] = ['rgsId', 'reqId', 'account', 'positionOwner', 'openDate', 'position', 'skillCategory',
    'mainSkill', 'additionalSkill', 'domain', 'projectName', 'expBand'];

  dataList = [
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
      'expBand': '1-2 yrs'
    },
    {
      'rgsId': 2301536,
      'reqId': 5530682,
      'account': 'ABN Amro',
      'positionOwner': 'Sachin Shah',
      'openDate': '22-01-2018',
      'position': 'Java Developer',
      'skillCategory': 'Java',
      'mainSkill': 'Java, Rest, JSON',
      'additionalSkill': 'Drools, XML, SQL',
      'domain': 'CB-Prod & Dist',
      'projectName': 'Customer',
      'expBand': '4-6 Yrs'
    },
    {
      'rgsId': 2320546,
      'reqId': 5564643,
      'account': 'ABN Amro',
      'positionOwner': 'Ketan H',
      'openDate': '24-02-2018',
      'position': 'Java Developer',
      'skillCategory': 'Java',
      'mainSkill': 'Java',
      'additionalSkill': 'Spring',
      'domain': 'Risk',
      'projectName': 'MPS',
      'expBand': '1-2 yrs'
    },
    {
      'rgsId': 3243368,
      'reqId': 543931,
      'account': 'ABN Amro',
      'positionOwner': 'Oscar',
      'openDate': '24-10-2017',
      'position': 'Java Developer',
      'skillCategory': 'Java',
      'mainSkill': 'Java',
      'additionalSkill': 'Spring,Angular JS',
      'domain': 'CB Payments & Distribution',
      'projectName': 'CRM',
      'expBand': '4-10 Yrs'
    },
    {
      'rgsId': 2320546,
      'reqId': 5564645,
      'account': 'ABN Amro',
      'positionOwner': 'Janak Pandya',
      'openDate': '01-03-2018',
      'position': 'Java Developer',
      'skillCategory': 'Java',
      'mainSkill': 'Java, Jenkins & CICD Coaching',
      'additionalSkill': 'Strong Communication',
      'domain': 'CoE SD',
      'projectName': 'Software Lifecycle',
      'expBand': '3-4 yrs'
    }
  ];

  dataSource = new MatTableDataSource(this.dataList);

  resultsLength = this.dataList.length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
