import { Routes } from '@angular/router';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { EmpdashComponent } from './empdash/empdash.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'SignUp', pathMatch: 'full' },
  { path: '', component: EmployeeLoginComponent },
  { path: 'Employee-Reg', component: EmployeeRegistrationComponent },
  { path: 'Empdash', component: EmpdashComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'AddEmp', component: AddEmpComponent },
  { path: 'EditEmp/:id', component: EditEmpComponent },
  
];
