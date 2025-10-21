import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-subscription-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  standalone: true,
  templateUrl: './subscription-dialog.component.html',
  styleUrl: './subscription-dialog.component.scss',
})
export class SubscriptionDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<SubscriptionDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);

  emailForm: FormGroup;

  constructor() {
    console.log('=== DIALOG COMPONENT CONSTRUCTOR ===');
    console.log('Dialog component created');
    console.log('Dialog ref:', this.dialogRef);
    console.log('Dialog data:', this.data);

    this.emailForm = this.fb.group({
      email: [this.data.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log('=== DIALOG COMPONENT ngOnInit ===');
    console.log('SubscriptionDialogComponent initialized', this.data);
    console.log('Dialog ref:', this.dialogRef);
    console.log('Email form:', this.emailForm.value);
    console.log('Form valid:', this.emailForm.valid);
    console.log('Dialog component instance:', this);

    // Subscribe to form value changes for real-time validation
    this.emailForm.valueChanges.subscribe((value) => {
      console.log('Form value changed:', value);
      console.log('Form valid:', this.emailForm.valid);
    });

    // Subscribe to email control status changes
    this.emailControl?.statusChanges.subscribe((status) => {
      console.log('Email control status:', status);
    });
  }

  get emailControl() {
    return this.emailForm.get('email');
  }

  get isEmailValid(): boolean {
    return this.emailControl?.valid || false;
  }

  get emailErrorMessage(): string {
    const control = this.emailControl;
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  get hasEmailError(): boolean {
    const control = this.emailControl;
    return !!(control?.invalid && control?.touched);
  }

  get canSubmit(): boolean {
    return this.emailForm.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      console.log('Submitting valid email:', email);
      this.dialogRef.close(email);
    } else {
      console.log('Form is invalid, cannot submit');
      // Mark all fields as touched to show validation errors
      this.emailForm.markAllAsTouched();
    }
  }
}
