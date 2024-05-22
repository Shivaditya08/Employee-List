import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Employee {
  id?: number;
  name: string;
  username: string;
  address: {
    city: string;
  };
  website: string;
  email: string;
  phone: number;
}

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
})
export class AddEmpComponent {
  empData: FormGroup = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    city: new FormControl(''),
    website: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });
  newEmpObj: Employee = {
    id: 0,
    name: '',
    username: '',
    address: { city: '' },
    website: '',
    email: '',
    phone: 0,
  };
  constructor(private _router: Router, private http: HttpClient) {}

  ngOnInit() {}

  addData() {
    const employee: Employee = {
      name: this.empData.get('name')?.value,
      username: this.empData.get('username')?.value,
      address: {
        city: this.empData.get('city')?.value,
      },
      website: this.empData.get('website')?.value,
      email: this.empData.get('email')?.value,
      phone: +this.empData.get('phone')?.value,
    };

    this.http
      .post('https://jsonplaceholder.typicode.com/users', employee)
      .subscribe((data: any) => {
        window.alert('Employee added successfully');
        this.newEmpObj = employee;

        this.keepDataToLocalStorage();
        this._router.navigate(['/Empdash']);
      });
  }

  keepDataToLocalStorage() {
    let newEmp: Employee[] = JSON.parse(localStorage.getItem('newEmp') || '[]');
    newEmp.push(this.newEmpObj);
    localStorage.setItem('newEmp', JSON.stringify(newEmp));
  }
}
