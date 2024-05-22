import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../Shared/services/employee.service';
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
  selector: 'app-edit-emp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-emp.component.html',
  styleUrl: './edit-emp.component.css',
})
export class EditEmpComponent {
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
  constructor(
    private _router: Router,
    private http: HttpClient,
    private _route: ActivatedRoute,
    private employeeService:EmployeeService
  ) {}
  ngOnInit() {
    const employeeId = this._route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeService.fetchData()
        .subscribe(
          (employees: Employee[]) => {
            const employee = employees.find(emp => emp.id === +employeeId);
            if (employee) {
              this.empData.patchValue({
                name: employee.name,
                username: employee.username,
                city: employee.address.city,
                website: employee.website,
                email: employee.email,
                phone: employee.phone,
              });
            }
          },
          (error: any) => {
            console.error('Error fetching employee details:', error);
          }
        );
    }
  }
  

  updateEmployee() {
    const employeeId = this._route.snapshot.paramMap.get('id');
  
    if (employeeId) {
      const employee: Employee = {
        name: this.empData.get('name')?.value,
        username: this.empData.get('username')?.value,
        address: {
          city: this.empData.get('city')?.value,
        },
        website: this.empData.get('website')?.value,
        email: this.empData.get('email')?.value,
        phone: this.empData.get('phone')?.value,
      };

      this.employeeService.updateEmployee(+employeeId, employee)
      .subscribe(
        (data: any) => {
          this.keepDataToLocalStorage(employee);
          window.alert('Employee edited successfully');
          this._router.navigate(['/Empdash']);
        },
        (error: any) => {
          console.error('Error editing employee:', error);
          window.alert(
            'An error occurred while editing employee. Please try again later.'
          );
        }
      );
    }
  }
  keepDataToLocalStorage(employee: Employee) {
    let editedEmployees: Employee[] = JSON.parse(
      localStorage.getItem('editedEmployees') || '[]'
    );
    editedEmployees.push(employee);
    localStorage.setItem('editedEmployees', JSON.stringify(editedEmployees));
  }
}
