import { Component } from '@angular/core';
import { Modal } from '../modal/modal';


@Component({
  selector: 'add',
  standalone: true,
  imports: [Modal],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  title = 'Add';

  contact = {
    name: 'register Name',
    phone: 'register Phone number',
    comment: 'register Comment'
  };

  onSave(data: { name: string; phone: string; comment: string }) {
    console.log('save inherits', data);
  }
  onCancel() {
    console.log('cancel inherits');
  }

}
