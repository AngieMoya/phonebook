import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-delete',
  imports: [],
  templateUrl: './modaldelete.html',
})
export class NgbdModalDelete {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');

  @Input() id: number | undefined;
  @Output() onDelete = new EventEmitter<number>();

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-delete-title' }).result.then(
      (result) => {
        if (this.id) this.onDelete.emit(this.id);
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
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
