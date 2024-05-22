import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { GlobaleService } from '../Shared/services/globale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css'
})
export class EmployeeRegistrationComponent {
  employeeForm: any

  constructor(private fb: FormBuilder, private _globalSer: GlobaleService, private _route: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fname: new FormControl("", [Validators.required, Validators.pattern("^[A-Za-z ]{3,20}$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      contact: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      gender: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")]),
      upass2: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")]),
      country: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required])
      

    })
  }
  submitData(data: any) {
    console.log(this.employeeForm.value)

    this._route.navigate(["/"])
  }
}







