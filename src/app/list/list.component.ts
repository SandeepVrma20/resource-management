import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeDetails } from './../employeeDetails';
import { ExcelService } from '../excel.service';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  header = 'List';

  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName', 'gender','email', 'phone','dob','city'];

  //dataSource = ELEMENT_DATA;
  isAdmin=true;
  username:String

  dataList: any;
  data: EmployeeDetails[]; //any;
  resultsLength: any;
  dataSource = new MatTableDataSource(this.dataList);
  showFiller = false;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username=localStorage.getItem('firstName');
    if(null!=localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin")=="false"){
      this.isAdmin =false;
     }

     this.employeeService.getEmployeesList()
     .subscribe(dataList => {
       this.dataList = dataList;
       this.fillDetails(JSON.parse(dataList));
     }
     );
  }
  fillDetails(dataList) {
    this.dataSource = new MatTableDataSource(dataList);
    this.resultsLength = dataList.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

const ELEMENT_DATA: EmployeeDetails[] = [
  {
    employeeId: 55914, firstName: 'Rajendra', lastName: 'Kumawat',
    email: 'kumawat@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 7514, firstName: 'Sandeep', lastName: 'Verma',
    email: 'sandflash@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 755914, firstName: 'Nilesh', lastName: 'Singh',
    email: 'singh.nilesh2@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 7554, firstName: 'Ritesh', lastName: 'Agarwal',
    email: 'ra2@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 75591, firstName: 'Nikhilesh', lastName: 'Singh',
    email: 'singh.nik@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 7514, firstName: 'Nilesh', lastName: 'Gupta',
    email: 'nilesh.gupta@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 7554, firstName: 'Fabia', lastName: 'Sharma',
    email: 'fabil.sharma@tcs.com', phone: '9545825467'
  },
  {
    employeeId: 5914, firstName: 'Carel', lastName: 'Oort',
    email: 'carel.oort@tcs.com', phone: '9545825467'
  }
];

