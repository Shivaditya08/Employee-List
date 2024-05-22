import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  updateEmployee(employeeId: number, updatedEmployee: any): Observable<any> {
    const updateUrl = `${this.url}/${employeeId}`;
    return this.http.put(updateUrl, updatedEmployee);
  }
}
