import { Component, inject } from '@angular/core';
import { Modal } from '../modal/modal';
import { ContactsService, CreateContactDto } from '../../services/contacts.service';
import { CONTACT_TYPES } from '../../constants/contact-types';

@Component({
  selector: 'add',
  standalone: true,
  imports: [Modal],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  contactsService = inject(ContactsService);
  title = 'Add';

  onSave(data: CreateContactDto) {
    this.contactsService.createContact(data).subscribe();
  }
  
  onCancel() {
    console.log('cancel inherits');
  }

}
