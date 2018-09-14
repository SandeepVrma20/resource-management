import { Component, Input, OnInit } from '@angular/core';
import { Salutation } from './../constants';
import { EmployeeDetails } from './../employeeDetails';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  salutation = Salutation;
  employeeDetails: EmployeeDetails = {};

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    if (event.files.length > 1) {
      console.log('Multiple files selected');
      return;
    }
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.employeeDetails.resume = file;

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

  newEmployee() {

    var employee = {
      employeeId: this.employeeDetails.employeeId,
      title: this.employeeDetails.title,
      firstName: this.employeeDetails.firstName,
      lastName: this.employeeDetails.lastName,
      middleName: this.employeeDetails.middleName,
      age: this.employeeDetails.age,
      phone: this.employeeDetails.phone,
      email: this.employeeDetails.email,
      resume: this.employeeDetails.resume,
      alternatePhone: this.employeeDetails.alternatePhone,
      addressLine1: this.employeeDetails.addressLine1,
      addressLine2: this.employeeDetails.addressLine2,
      city: this.employeeDetails.city,
      state: this.employeeDetails.state,
      country: this.employeeDetails.country,
      pinCode: this.employeeDetails.pinCode,
      creationDate: new Date()
    };
    alert('inside alert--- >' + employee.firstName + employee.employeeId);
    this.employeeService.createEmployee(employee)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  ngOnInit() {
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public onSubmit() {
    console.log();
    console.log(this.employeeDetails);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
