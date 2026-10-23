import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, Navbar],
  templateUrl: './job-application.html',
  styleUrl: './job-application.css'
})
export class JobApplicationComponent {
  private fb = inject(FormBuilder);

  saved: any = null;

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],

    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[1-9]\d{5}$/)]]
    }),

    skills: this.fb.array([this.fb.control('', Validators.required)]),

    currentlyEmployed: [false],
    companyName: ['']
  });

  constructor() {
    this.form.get('currentlyEmployed')!.valueChanges.subscribe(isEmployed => {
      const company = this.form.get('companyName')!;

      if (isEmployed) {
        company.setValidators(Validators.required);
      } else {
        company.clearValidators();
        company.setValue('');
      }

      company.updateValueAndValidity();
    });
  }

  get skills() {
    return this.form.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved = this.form.value;
  }

  newApplication() {
    this.saved = null;
    this.skills.clear();
    this.addSkill();
    this.form.reset();
  }
}