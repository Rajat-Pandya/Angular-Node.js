import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-emp-detail',
  imports: [Navbar, FormsModule, NgClass, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './emp-detail.html',
  styleUrl: './emp-detail.css',
})
export class EmpDetail {
  departments = ['Engineering', 'HR', 'Finance', 'Sales', 'Operations'];

  employee = {
    empId: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    department: '',
    designation: '',
    joiningDate: '',
    experience: null as number | null,
    pincode: '',
    address: '' as string | null
  };

  message = '';
  isSuccess = false;

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get maxDob(): string {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  }

  get isUnderAge(): boolean {
    return !!this.employee.dob && this.employee.dob > this.maxDob;
  }

  get isFutureJoining(): boolean {
    return !!this.employee.joiningDate && this.employee.joiningDate > this.today;
  }

  saveEmployee(form: NgForm) {
    if (form.invalid || this.isUnderAge || this.isFutureJoining) {
      this.message = 'Please fix the errors before saving';
      this.isSuccess = false;
      return;
    }

    console.log(this.employee);
    this.message = 'Employee saved successfully';
    this.isSuccess = true;
    form.resetForm();
    this.employee = {
      empId: '',
      name: '',
      email: '',
      phone: '',
      dob: '',
      department: '',
      designation: '',
      joiningDate: '',
      experience: null,
      pincode: '',
      address: ''
    };
  }
}