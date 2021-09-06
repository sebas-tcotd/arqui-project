import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css'],
})
export class ClinicFormComponent implements OnInit {
  public clinicHistoryForm!: FormGroup;
  public formSubmitted: boolean = false;

  @Input() isVisible!: boolean;
  @Output() formEmitter: EventEmitter<FormGroup> = new EventEmitter();
  @Output() closeFormEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.clinicHistoryForm = this.fb.group({
      admision_date: ['', Validators.required],
      diagnostic: ['', [Validators.required, Validators.maxLength(500)]],
      medic_name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ])*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
          ),
        ],
      ],
      patient_birth_date: ['', Validators.required],
      patient_dni: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      patient_name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ])*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
          ),
        ],
      ],
      patient_number: ['', [Validators.required, Validators.min(0)]],
      patient_sex: ['', Validators.required],
    });
  }

  submitForm() {
    this.formSubmitted = true;
    let isValid: boolean = this.clinicHistoryForm.valid;

    if (!isValid) {
      return;
    }

    this.formEmitter.emit(this.clinicHistoryForm);
  }

  isFieldValid(field: string): boolean {
    if (this.clinicHistoryForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
