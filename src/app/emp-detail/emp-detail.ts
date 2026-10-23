import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-detail',
  imports: [Navbar, ReactiveFormsModule, CommonModule],
  templateUrl: './emp-detail.html',
  styleUrl: './emp-detail.css',
})
export class EmpDetail implements OnInit {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  isSubmitting: boolean = false;
  message: string = '';
  errorMessage: string = '';

  defaultEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      designation: 'Developer',
      salary: 50000.0,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      salary: [50000, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        const list = Array.isArray(data) ? data : data?.employees || data?.data || [];
        this.employees = list.length > 0 ? list : [...this.defaultEmployees];
      },
      error: (err: any) => {
        console.warn('Backend API not reachable, loading fallback employees:', err);
        if (this.employees.length === 0) {
          this.employees = [...this.defaultEmployees];
        }
      },
    });
  }

  addEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const formVal = this.employeeForm.value;
    const newEmp: Employee = {
      firstName: formVal.firstName,
      lastName: formVal.lastName,
      email: formVal.email,
      department: formVal.department,
      designation: formVal.designation,
      salary: Number(formVal.salary),
    };

    this.employeeService.createEmployee(newEmp).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loadEmployees();
        this.employeeForm.reset({ salary: 50000 });
      },
      error: (err: any) => {
        console.warn('Error from backend API, updating locally:', err);
        this.isSubmitting = false;
        const nextId = this.employees.length
          ? Math.max(...this.employees.map((e) => Number(e.id) || 0)) + 1
          : 1;
        this.employees = [...this.employees, { ...newEmp, id: nextId }];
        this.employeeForm.reset({ salary: 50000 });
      },
    });
  }

  deleteEmployee(id?: number): void {
    if (!id) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },
      error: (err: any) => {
        console.warn('Backend delete failed, removing locally:', err);
        this.employees = this.employees.filter((emp) => emp.id !== id);
      },
    });
  }

  formatSalary(salary: any): string {
    const val = Number(salary) || 0;
    return val.toFixed(2);
  }
}
