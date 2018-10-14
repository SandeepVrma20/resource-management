import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RequirementService } from '../requirement.service';
import { RequirementDetails } from '../requirementDetails';
import { ActivatedRoute } from '@angular/router';
import { ParsedVariable } from '@angular/compiler';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  columnHeadersOrder: string[] = ['rgsId', 'reqId', 'account', 'positionOwner', 'openDate', 'position', 'skillCategory',
    'mainSkill', 'additionalSkill', 'domain', 'projectName', 'expBand'];

    dataList:  any;
    data :any;
    resultsLength: any;
    dataSource = new MatTableDataSource(this.dataList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private requiermentService:RequirementService , 
    private route :ActivatedRoute ,
    private excelService:ExcelService
    ) {
    
  }

  ngOnInit() {
    let parameter = this.route.snapshot.paramMap.get('mainSkill');
    if(parameter==null){
      this.requiermentService.getRequirementList()
    .subscribe(dataList=> {     
      this.dataList  =  dataList;
      this.fillDetails(JSON.parse(dataList));     
        }
      )
    }else{
      this.requiermentService.getRequirementBySkill(parameter)
      .subscribe(dataList=> {     
        //this.dataList  =  dataList;
        this.dataList  =  JSON.parse(dataList);
        this.fillDetails(JSON.parse(dataList));     
      }
     )
    }
  }

  fillDetails(dataList){
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

  downloadToExcel():void {
   this.data =JSON.parse(this.dataList);
   this.excelService.exportAsExcelFile(this.data, 'RequirementLists');
 }

}
