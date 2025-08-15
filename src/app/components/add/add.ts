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
    name: 'add Name',
    phone: 'add Phone number',
    comment: 'add Comment',
    documentNumber: 'add document',
    email: 'add email',
    organizationName: 'add organization name',
    address: 'add address',
    legalRepresentative: 'add legal representative',
    
  };

  onSave(data: { name: string; phone: string; comment: string }) {
    console.log('save inherits', data);
  }
  
  onCancel() {
    console.log('cancel inherits');
  }

}
