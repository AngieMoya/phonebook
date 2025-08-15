import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ModalEdit } from "../modaledit/modaledit";
import { NgbdModalDelete } from "../modaldelete/modaldelete";
import { USERS } from "../../constants/mock";
import { CONTACT_TYPES, MAPPED_CONTACT_TYPES } from "../../constants/contact-types";


export interface Contact {
  id: number;
  contactType: number;
  name: string;
  phoneNumber: string;
  comments: string;
  documentNumber: string;
  email: string;
  legalRepresentative: string;
  publicOrganizationAddress: string;
  organizationName: string;
  legalRepresentativeName: string;
  privateOrganizationAddress: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule, ModalEdit, NgbdModalDelete],
  templateUrl: './datagrid.html',
  styleUrl: './datagrid.css'
})
export class Datagrid {
  @Input() contacts: Contact[]=[]; 

  contactTypes = CONTACT_TYPES;
  mappedContactTypes = MAPPED_CONTACT_TYPES;

  //edit method
  editContact(contact:Contact):void{

  }
  //delete method
  deleteContact(contact: Contact): void {
    console.log('Eliminando contacto:', contact);
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${contact.name}?`);
    
    if (confirmDelete) {
      const index = this.contacts.findIndex(c => c.name === contact.name);
      if (index > -1) {
        this.contacts.splice(index, 1);
      }
    }
  }
}
