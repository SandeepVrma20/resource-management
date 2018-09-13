import { Component, Input, OnInit } from '@angular/core';

import { EmployeeDetails } from '../employeeDetails';
import { EmployeeService } from '../employee.service';
import { Salutation } from '../constants';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
		employeedetails: EmployeeDetails = new EmployeeDetails();
  //employeedetails: any = {};
  

  constructor(private employeeService: EmployeeService) { }
  
 
  ngOnInit() {
  }
  
 

  newEmployee(){
	  
	  var employee  = {
    employeeId:this.employeedetails.employeeId,
    title:  this.employeedetails.title,
    firstName: this.employeedetails.firstName,
    lastName:  this.employeedetails.lastName,
    middleName:this.employeedetails.middleName,
    age:  this.employeedetails.age,
    phone:  this.employeedetails.phone,
    email: this.employeedetails.email,
    resume: this.employeedetails.resume,
    alternatePhone: this.employeedetails.alternatePhone,
    addressLine1: this.employeedetails.addressLine1,
    addressLine2: this.employeedetails.addressLine2,
    city: this.employeedetails.city,
    state: this.employeedetails.state,
    country: this.employeedetails.country,
    pinCode: this.employeedetails.pinCode,
    creationDate : new Date()
    
};
	  alert('inside alert--- >' +employee.firstName + employee.employeeId) ;
	  this.employeeService.createEmployee(employee)
      .subscribe(data => console.log(data), error => console.log(error));
  	  
  }


  salutation = Salutation;
 // employeeDetails: EmployeeDetails;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }


}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}