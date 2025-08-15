import { Component, EventEmitter, inject, Input, Output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';
import { CONTACT_TYPES } from '../../constants/contact-types';


@Component({
  selector: 'ngbd-modal',
  standalone: true,
  imports: [FormsModule, Dropdown],
  templateUrl: './modal.html',
})
export class Modal {
  contactTypes:DropdownOption[] = CONTACT_TYPES
  
  private modalService = inject(NgbModal);

  
  @Input() modalTitle: string = '';
  @Input() nameLabel: string = '';
  @Input() phoneLabel: string = '';
  @Input() commentLabel: string = '';
  @Input() showDropdown: boolean = true;
  @Input() saveButtonLabel: string = '';
  @Input() cancelButtonLabel: string = '';

  
  @Input() nameValue: string = '';
  @Input() phoneValue: string = '';
  @Input() commentValue: string = '';


  @Output() save = new EventEmitter<{ name: string; phone: string; comment: string }>();
  @Output() cancel = new EventEmitter<void>();

  closeResult: WritableSignal<string> = signal('');

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  onSave(modal: any) {
    this.save.emit({
      name: this.nameValue,
      phone: this.phoneValue,
      comment: this.commentValue
    });
    modal.close('Save click');
  }

  onCancel(modal: any) {
    this.cancel.emit();
    modal.dismiss('cancel click');
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
}
