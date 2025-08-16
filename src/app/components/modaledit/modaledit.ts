import { Component, inject, Input } from '@angular/core';
import { Modal } from '../modal/modal';
import {
  ContactsService,
  CreateContactDto,
  UpdateContactDto,
} from '../../services/contacts.service';
import { Contact } from '../../interfaces/api-interface';

@Component({
  selector: 'modal-edit',
  standalone: true,
  imports: [Modal],
  templateUrl: './modaledit.html',
  styleUrl: './modaledit.css',
})
export class ModalEdit {
  title = 'Edit';
  contactsService = inject(ContactsService);

  @Input() contact: Contact | undefined;

  onSave(data: CreateContactDto | UpdateContactDto) {
    console.log("onUpdate",data)
    if ('id' in data) {
      this.contactsService.updateContact(data.id, data).subscribe();
      console.log('save inherits', data);
    }
  }
  onCancel() {
    console.log('cancel inherits');
  }
}
