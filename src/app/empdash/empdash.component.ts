import { Component, TemplateRef, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlobaleService } from '../Shared/services/globale.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../Shared/services/employee.service';

interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: number;
  website: string;
  address: {
    city: string;
  };
}
@Component({
  selector: 'app-empdash',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    FooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './empdash.component.html',
  styleUrls: ['./empdash.component.css'],
})
export class EmpdashComponent {
  constructor(
    private _globalSer: GlobaleService,
    private _router: Router,
    private http: HttpClient,
    private employeeService:EmployeeService
  ) {}

  showName: any;
  hover: boolean = false;
  sortBy: string = '';
  categories = ['name', 'username', 'email', 'website'];
  toggleHover() {
    this.hover = !this.hover;
  }

  empData: any[] = [];
  searchText: string = '';
  filteredEmpData: any[] = [];

  ngOnInit() {
  
    this.showName = sessionStorage.getItem('user');
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.fetchData()
      // .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        this.empData = data;
        this.filteredEmpData = [...this.empData];

        const newEmp: Employee[] = JSON.parse(
          localStorage.getItem('newEmp') || '[]'
        );
        if (newEmp.length > 0) {
          this.empData = [...this.empData, ...newEmp];
          this.filteredEmpData = [...this.empData];
        }
      });
  }
  openFullscreen(content: TemplateRef<any>) {}

  deleteEmployee(employee: Employee) {
    if (
      window.confirm(
        `Are you sure you want to delete record with ${employee.id}`
      )
    ) {
      const index = this.empData.findIndex((emp) => emp.id === employee.id);
      if (index > -1) {
        this.empData.splice(index, 1);
        this.filteredEmpData = [...this.empData];

        window.alert('Data deleted successfully');
      }
    }
  }

  search() {
    if (!this.searchText) {
      this.filteredEmpData = this.empData;
    } else {
      this.filteredEmpData = this.empData.filter(
        (emp) =>
          emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          emp.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
          emp.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          emp.phone
            .toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          emp.website.toLowerCase().includes(this.searchText.toLowerCase()) ||
          emp.address.city.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  sortData() {
    if (this.sortBy) {
      this.filteredEmpData.sort((a, b) =>
        a[this.sortBy] > b[this.sortBy] ? 1 : -1
      );
    } else {
      this.filteredEmpData = this.empData;
    }
  }

  logout() {
    if (window.confirm('Are you sure you want to log out?')) {
      this._globalSer.signOut();
      this._router.navigate(['/']);
    }
  }
}
