import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  inject,
  signal,
  WritableSignal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';
import { CONTACT_TYPES, MAPPED_CONTACT_TYPES } from '../../constants/contact-types';
import { CreateContactDto, UpdateContactDto } from '../../services/contacts.service';

@Component({
  selector: 'ngbd-modal',
  standalone: true,
  imports: [ReactiveFormsModule, Dropdown],
  templateUrl: './modal.html',
})
export class Modal implements OnChanges {
  contactTypes: DropdownOption[] = CONTACT_TYPES;

  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  @Input() modalTitle: string = '';
  @Input() nameLabel: string = '';
  @Input() phoneLabel: string = '';
  @Input() commentLabel: string = '';
  @Input() documentNumberLabel: string = '';
  @Input() emailLabel: string = '';
  @Input() organizationNameLabel: string = '';
  @Input() addressLabel: string = '';
  @Input() legalRepresentativeLabel: string = '';

  @Input() id: number | undefined;
  @Input() nameValue: string = '';
  @Input() phoneValue: string = '';
  @Input() commentValue: string = '';
  @Input() documentNumberValue: string = '';
  @Input() emailValue: string = '';
  @Input() organizationNameValue: string = '';
  @Input() addressValue: string = '';
  @Input() legalRepresentativeValue: string = '';
  @Input() contactTypeValue: number | undefined;

  @Input() saveButtonLabel: string = '';
  @Input() cancelButtonLabel: string = '';

  @Output() save = new EventEmitter<CreateContactDto | UpdateContactDto>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  closeResult: WritableSignal<string> = signal('');

  constructor() {
    this.form = this.fb.group({
      contactTypeSelected: [null, Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      comments: [''],
      documentNumber: [''],
      email: ['', Validators.email],
      organizationName: [''],
      address: [''],
      legalRepresentative: [''],
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.form.reset();
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  onSave(modal: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    this.save.emit({
      id: this.id,
      contactType: value.contactTypeSelected.value,
      name: value.name,
      phoneNumber: value.phoneNumber,
      comments: value.comments,
      documentNumber: value.documentNumber,
      email: value.email,
      organizationName: value.organizationName,
      publicOrganizationAddress: value.address,
      legalRepresentativeName: value.legalRepresentative,
      privateOrganizationAddress: value.address,
    });
    modal.close('Save click');
  }

  onCancel(modal: any) {
    this.cancel.emit();
    modal.dismiss('cancel click');
  }

  onSelectionChange(option: DropdownOption) {
    this.form.get('contactTypeSelected')?.setValue(option);
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.form) {
      this.form.patchValue({
        contactTypeSelected: this.contactTypeValue
          ? MAPPED_CONTACT_TYPES[this.contactTypeValue]
          : MAPPED_CONTACT_TYPES[0],
        name: this.nameValue,
        phoneNumber: this.phoneValue,
        comments: this.commentValue,
        documentNumber: this.documentNumberValue,
        email: this.emailValue,
        organizationName: this.organizationNameValue,
        address: this.addressValue,
        legalRepresentative: this.legalRepresentativeValue,
      });
    }
  }
}
