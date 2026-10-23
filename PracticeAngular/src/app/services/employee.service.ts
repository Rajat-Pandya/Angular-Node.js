import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department: string;
    designation?: string;
    salary: string | number;
    joiningDate?: string;
    isActive?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiUrl = 'http://localhost:3000/api/employees';

    constructor(private http: HttpClient) {}

    getEmployees() : Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getEmployeeID(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createEmployee(employee: Employee): Observable<any> {
        return this.http.post<any>(this.apiUrl, employee);
    }

    updateEmployee(id: number, employee: Partial<Employee>): Observable<any>{
        return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
    }

    deleteEmployee(id: number): Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
