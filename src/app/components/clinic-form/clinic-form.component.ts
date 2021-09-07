import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css'],
})
export class ClinicFormComponent implements OnInit {
  public clinicHistoryForm!: FormGroup;
  public formSubmitted: boolean = false;

  @Input() isVisible: boolean = true;
  @Output() formEmitter: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private fb: FormBuilder, public modal: ModalImageService) {}

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
      patient_sex: ['', Validators.required],
    });
  }

  submitForm() {
    this.formSubmitted = true;
    let isValid: boolean = this.clinicHistoryForm.valid;

    if (!isValid) {
      return;
    }

    const form = this.clinicHistoryForm;

    this.formEmitter.emit(form);
    this.cleanFormFields();
  }

  isFieldInvalid(field: string): boolean {
    if (this.clinicHistoryForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }

    return false;
  }

  closeModal() {
    this.clinicHistoryForm.reset();
    this.modal.closeModal();
  }

  private cleanFormFields() {
    if (this.clinicHistoryForm.dirty) {
      this.clinicHistoryForm.setValue({
        admision_date: '',
        diagnostic: '',
        medic_name: '',
        patient_birth_date: '',
        patient_dni: '',
        patient_name: '',
        patient_sex: '',
      });
      this.closeModal();
    }
  }
}
