import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {AbstractControl,AsyncValidatorFn, FormArray, FormControl, FormGroup, FormRecord, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable, map, of, timer } from 'rxjs';

/* =====================================================
   FAKE BACKEND (swap for HttpClient later)
   ===================================================== */
const TAKEN_USERNAMES = ['admin', 'john', 'priya'];
const TAKEN_EMAILS = ['test@example.com', 'admin@company.com'];

function fakeServerCheck(list: string[], value: string): Observable<boolean> {
  return timer(800).pipe(map(() => list.includes(value.toLowerCase())));
}

/* =====================================================
   VALIDATOR FUNCTIONS
   ===================================================== */

// async validator factory
function takenValidator(
  check: (value: string) => Observable<boolean>,
  errorKey: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);
    return check(control.value).pipe(
      map(taken => (taken ? { [errorKey]: true } : null))
    );
  };
}

// cross-field: password match (applied to the account group)
const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
};

// cross-field: end date after start date (applied to each experience row)
const dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  return start && end && end <= start ? { dateRange: true } : null;
};

// validator with a parameter
function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const dob = new Date(control.value);
    const limit = new Date();
    limit.setFullYear(limit.getFullYear() - minAge);
    return dob <= limit ? null : { minAge: { required: minAge } };
  };
}

// FormArray: at least N rows
function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = (control as FormArray).length;
    return length >= min ? null : { minArrayLength: { required: min, actual: length } };
  };
}

// FormRecord: at least one checkbox ticked
const atLeastOneSelected: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const values = Object.values(group.value as Record<string, boolean>);
  return values.some(Boolean) ? null : { noneSelected: true };
};

/* =====================================================
   TYPES AND CONSTANTS
   ===================================================== */
type ExperienceGroup = FormGroup<{
  company: FormControl<string>;
  role: FormControl<string>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
}>;

interface SavedApplication {
  submittedAt: Date;
  personal: { fullName: string; dateOfBirth: string; phone: string; bio: string };
  account: { username: string; email: string };
  address: { street: string; city: string; state: string; zipCode: string };
  emergencyContact: { name: string; phone: string; relationship: string };
  skills: string[];
  workExperience: { company: string; role: string; startDate: string; endDate: string }[];
  employment: { currentlyEmployed: boolean; companyName: string; noticePeriod: number | null };
  jobTypes: string[];
}

const PHONE = /^[6-9]\d{9}$/;
const ZIP = /^[1-9]\d{5}$/;
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

/* =====================================================
   COMPONENT
   ===================================================== */
@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [
    Navbar,
    ReactiveFormsModule, DatePipe,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatSlideToggleModule, MatButtonModule
  ],
  templateUrl: './job-application.html',
  styleUrl: './job-application.css'
})
export class JobApplicationComponent {
  private fb = inject(NonNullableFormBuilder);

  states = ['Gujarat', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Delhi'];
  relationships = ['Parent', 'Sibling', 'Spouse', 'Friend', 'Other'];
  jobTypeOptions = ['Full-time', 'Internship', 'Contract', 'Remote'];

  /* arrays and record are created first so the main form can include them */
  skills = new FormArray<FormControl<string>>([], {
    validators: [minArrayLength(1)]
  });
  workExperience = new FormArray<ExperienceGroup>([]);
  jobTypes = new FormRecord<FormControl<boolean>>({}, {
    validators: [atLeastOneSelected]
  });

  form = this.fb.group({
    personal: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)]],
      dateOfBirth: ['', [Validators.required, minAgeValidator(18)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE)]],
      bio: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]]
    }),

    account: this.fb.group(
      {
        username: ['', {
          validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-z0-9_]+$/)],
          asyncValidators: [takenValidator(v => fakeServerCheck(TAKEN_USERNAMES, v), 'usernameTaken')]
        }],
        email: ['', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [takenValidator(v => fakeServerCheck(TAKEN_EMAILS, v), 'emailTaken')]
        }],
        password: ['', [Validators.required, Validators.pattern(STRONG_PASSWORD)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator }
    ),

    address: this.fb.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(ZIP)]]
    }),

    emergencyContact: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE)]],
      relationship: ['', Validators.required]
    }),

    skills: this.skills,
    workExperience: this.workExperience,

    employment: this.fb.group({
      currentlyEmployed: [false],
      companyName: [''],
      noticePeriod: this.fb.control<number | null>(null)
    }),

    jobTypes: this.jobTypes
  });

  /* signals */
  isEmployed = toSignal(
    this.form.controls.employment.controls.currentlyEmployed.valueChanges,
    { initialValue: false }
  );
  saved = signal<SavedApplication | null>(null);

  /* shortcuts so the template stays short */
  get personal()   { return this.form.controls.personal.controls; }
  get account()    { return this.form.controls.account.controls; }
  get address()    { return this.form.controls.address.controls; }
  get emergency()  { return this.form.controls.emergencyContact.controls; }
  get employment() { return this.form.controls.employment.controls; }

  constructor() {
    this.jobTypeOptions.forEach(type =>
      this.jobTypes.addControl(type, new FormControl(false, { nonNullable: true }))
    );
    this.addSkill();
    this.watchEmployment();
  }

  /* ---------- FormArray: skills ---------- */
  addSkill(value = '') {
    this.skills.push(
      new FormControl(value, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)]
      })
    );
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
    this.skills.markAsDirty();
  }

  /* ---------- FormArray: work experience ---------- */
  addExperience() {
    this.workExperience.push(
      this.fb.group(
        {
          company: ['', Validators.required],
          role: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
        },
        { validators: dateRangeValidator }
      )
    );
  }

  removeExperience(index: number) {
    this.workExperience.removeAt(index);
    this.workExperience.markAsDirty();
  }

  /* ---------- conditional validation ---------- */
  private watchEmployment() {
    const { currentlyEmployed, companyName, noticePeriod } = this.employment;

    currentlyEmployed.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(isEmployed => {
        if (isEmployed) {
          companyName.setValidators([Validators.required, Validators.minLength(2)]);
          noticePeriod.setValidators([Validators.required, Validators.min(0), Validators.max(180)]);
        } else {
          companyName.clearValidators();
          noticePeriod.clearValidators();
          companyName.reset('');
          noticePeriod.reset(null);
        }
        companyName.updateValueAndValidity();
        noticePeriod.updateValueAndValidity();
      });
  }

  /* ---------- error message helper ---------- */
  getError(control: AbstractControl | null, label: string, patternMessage = 'Invalid format'): string {
    const e = control?.errors;
    if (!e) return '';
    if (e['required'])      return `${label} is required`;
    if (e['email'])         return 'Enter a valid email address';
    if (e['minlength'])     return `${label} must be at least ${e['minlength'].requiredLength} characters`;
    if (e['maxlength'])     return `${label} cannot exceed ${e['maxlength'].requiredLength} characters`;
    if (e['min'])           return `${label} must be at least ${e['min'].min}`;
    if (e['max'])           return `${label} cannot be more than ${e['max'].max}`;
    if (e['pattern'])       return patternMessage;
    if (e['minAge'])        return `You must be at least ${e['minAge'].required} years old`;
    if (e['usernameTaken']) return 'This username is already taken';
    if (e['emailTaken'])    return 'This email is already registered';
    return 'Invalid value';
  }

  /* ---------- setValue vs patchValue ---------- */
  fillSample() {
    // patchValue: you may pass only some keys
    this.form.controls.personal.patchValue({
      fullName: 'Alex Sharma',
      dateOfBirth: '2001-05-20',
      phone: '9876543210'
    });

    // setValue: every key must be present, or Angular throws
    this.form.controls.address.setValue({
      street: '12 MG Road',
      city: 'Pune',
      state: 'Maharashtra',
      zipCode: '411001'
    });
  }

  /* ---------- submit, reset, edit ---------- */
  submit() {
    if (this.form.pending) return;           // async check still running

    if (this.form.invalid) {
      this.form.markAllAsTouched();          // reveal every error at once
      return;
    }

    const v = this.form.getRawValue();
    this.saved.set({
      submittedAt: new Date(),
      personal: v.personal,
      account: { username: v.account.username, email: v.account.email },  // no passwords
      address: v.address,
      emergencyContact: v.emergencyContact,
      skills: v.skills,
      workExperience: v.workExperience,
      employment: v.employment,
      jobTypes: Object.entries(v.jobTypes)
        .filter(([, selected]) => selected)
        .map(([name]) => name)
    });
  }

  resetForm() {
    this.skills.clear();
    this.workExperience.clear();
    this.addSkill();
    this.form.reset();                       // back to initial values, pristine, untouched
  }

  startNew() {
    this.saved.set(null);
    this.resetForm();
  }

  editApplication() {
    const app = this.saved();
    if (!app) return;

    // rows must exist before patchValue can fill them
    this.skills.clear();
    app.skills.forEach(s => this.addSkill(s));
    this.workExperience.clear();
    app.workExperience.forEach(() => this.addExperience());

    this.form.patchValue({
      personal: app.personal,
      account: { username: app.account.username, email: app.account.email },
      address: app.address,
      emergencyContact: app.emergencyContact,
      skills: app.skills,
      workExperience: app.workExperience,
      employment: app.employment,
      jobTypes: Object.fromEntries(
        this.jobTypeOptions.map(t => [t, app.jobTypes.includes(t)])
      )
    });

    this.saved.set(null);
  }
}