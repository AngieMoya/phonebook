import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ModalEdit } from "../modaledit/modaledit";
import { NgbdModalDelete } from "../modaldelete/modaldelete";


interface Contact {
  contactType: string;
  name: string;
  phoneNumber: string;
  comment: string;
  documentNumber: string;
  email: string;
  organizationName: string;
  address: string;
  legalRepresentative: string;
}

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [CommonModule, ModalEdit, NgbdModalDelete],
  templateUrl: './datagrid.html',
  styleUrl: './datagrid.css'
})
export class Datagrid {

   contacts: Contact[] = [
    {
      contactType: 'Persona',
      name: 'Juan Pérez',
      phoneNumber: '+57 300 123 4567',
      comment: 'Amigo de la universidad',
      documentNumber: "",
      email: "",
      organizationName: "",
      address: "",
      legalRepresentative: ""
    },
    {
      contactType: 'Public Organization',
      name: 'María García',
      phoneNumber: '+57 310 987 6543',
      comment: 'Cliente potencial',
      documentNumber: "",
      email: "",
      organizationName: "",
      address: "",
      legalRepresentative: ""
    },
    {
      contactType: 'Private Organization',
      name: 'Dr. Rodriguez',
      phoneNumber: '+57 320 555 0123',
      comment: 'Médico de cabecera',
      documentNumber: "",
      email: "",
      organizationName: "",
      address: "",
      legalRepresentative: ""
    }
  ];
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
