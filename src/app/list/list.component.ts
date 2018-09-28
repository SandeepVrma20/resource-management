import { Component, OnInit } from '@angular/core';
import { EmployeeDetails } from './../employeeDetails';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  header = 'List';

  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName', 'email', 'phone'];

  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
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

