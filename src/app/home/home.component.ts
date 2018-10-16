import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Routes, RouterModule, Router } from '@angular/router';
import { RequirementService } from '../requirement.service';
import { RequirementDetails } from '../requirementDetails';
// import { RequirementGrpDetails } from '../requirementGrpDetails';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private requirementService: RequirementService, private router: Router) {

  }
  fillDetails(dataList) {
    this.dataSource = new MatTableDataSource(dataList);
    this.resultsLength = dataList.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.requirementService.getGrpRequirement()
      .subscribe(dataList => {
        this.dataList = dataList;
        this.fillDetails(JSON.parse(dataList));
      }
      );
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

  getDetails(requirementCount) {
    this.router.navigate(['/listdetails', requirementCount.mainSkill]);
  }

}
