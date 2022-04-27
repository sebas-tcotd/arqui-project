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
      admisionDate: ['', Validators.required],
      // diagnostic: ['', [Validators.required, Validators.maxLength(500)]],
      medicName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ])*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
          ),
        ],
      ],
      patientBirthdate: ['', Validators.required],
      patientDni: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      patientName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ])*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/
          ),
        ],
      ],
      patientSex: ['', Validators.required],
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
    if (
      this.clinicHistoryForm.get(field)?.invalid &&
      this.clinicHistoryForm.touched
    ) {
      return false;
    }

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
        admisionDate: '',
        medicName: '',
        patientBirthdate: '',
        patientDni: '',
        patientName: '',
        patientSex: '',
      });
      this.closeModal();
    }
  }
}
