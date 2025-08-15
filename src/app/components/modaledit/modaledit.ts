import { Component } from '@angular/core';
import { Modal } from '../modal/modal';



@Component({
  selector: 'modal-edit',
  standalone: true,
  imports: [Modal],
  templateUrl: './modaledit.html',
  styleUrl: './modaledit.css'
})
export class ModalEdit {
  title = 'Edit';

  contact = {
    name: 'edit Name',
    phone: 'edit Phone number',
    comment: 'edit Comment'
  };

  onSave(data: { name: string; phone: string; comment: string }) {
    console.log('save inherits', data);
  }
  onCancel() {
    console.log('cancel inherits');
  }

}
