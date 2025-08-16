import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ModalEdit } from '../modaledit/modaledit';
import { NgbdModalDelete } from '../modaldelete/modaldelete';
import { CONTACT_TYPES, MAPPED_CONTACT_TYPES } from '../../constants/contact-types';
import { Contact } from '../../interfaces/api-interface';
import { ContactsService, UpdateContactDto } from '../../services/contacts.service';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule, ModalEdit, NgbdModalDelete],
  templateUrl: './datagrid.html',
  styleUrl: './datagrid.css',
})
export class Datagrid {
  contactsService = inject(ContactsService);
  @Input() contacts: Contact[] = [];

  contactTypes = CONTACT_TYPES;
  mappedContactTypes = MAPPED_CONTACT_TYPES;

  //edit method
  editContact(contact: Contact): void {}

  //delete method
  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe((res)=>{
      console.log(res);
    });
  }
}
