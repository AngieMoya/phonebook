import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown } from "../dropdown/dropdown";

@Component({
	selector: 'ngbd-modal-edit',
	imports: [Dropdown],
	templateUrl: './modaledit.html',
})
export class NgbdModalEdit {
	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-edit-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
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