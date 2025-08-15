import { Component, EventEmitter, inject, Input, Output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown } from "../dropdown/dropdown";

@Component({
  selector: 'ngbd-modal',
  standalone: true,
  imports: [Dropdown, FormsModule],
  templateUrl: './modal.html',
})
export class Modal {

  private modalService = inject(NgbModal);

  // Props personalizables
  @Input() modalTitle: string = 'Title';
  @Input() nameLabel: string = 'Name';
  @Input() phoneLabel: string = 'Phone number';
  @Input() commentLabel: string = 'Comment';
  @Input() showDropdown: boolean = true;
  @Input() saveButtonLabel: string = 'Save changes';
  @Input() cancelButtonLabel: string = 'Cancel';

  // Datos iniciales (pueden venir desde fuera)
  @Input() nameValue: string = '';
  @Input() phoneValue: string = '';
  @Input() commentValue: string = '';

  // Emitir eventos al guardar/cancelar
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
