import { Component } from '@angular/core';
import { GlobaleService } from '../Shared/services/globale.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css',
})
export class EmployeeLoginComponent {
  userData: any;
  userDB: any = [];

  constructor(private _golbalSer: GlobaleService, private _router: Router) {}

  ngOnInit() {
    this.userData = new FormGroup({
      userId: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
        ),
      ]),
    });
  }
  seeData() {
    console.log(this.userData.value);
    this._golbalSer.getReq('users').subscribe((res) => {
      this.userDB = res;
      const data = this.userDB.filter((val: any) => {
        return (
          val.uid === this.userData.value.userId &&
          val.upass === this.userData.value.userPass
        );
      });
      if (data.length > 0) {
        this._golbalSer.signIn(this.userData.userId);
        window.alert('Login Successfully');
        sessionStorage.setItem('user', this.userData.value.userId);
        this._router.navigate(['Empdash']);
      } else {
        window.alert('Invalid Credentials');
      }
    });
  }
}
