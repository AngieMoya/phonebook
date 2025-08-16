import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Datagrid } from './components/datagrid/datagrid';
import { Add } from './components/add/add';
import { Dropdown, DropdownOption } from './components/dropdown/dropdown';
import { CONTACT_TYPES } from './constants/contact-types';
import { USERS } from './constants/mock';
import { Contact } from './interfaces/api-interface';
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Datagrid, Add, Dropdown],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App{
  contactsService = inject(ContactsService);

  contactTypeSelected = signal<DropdownOption | undefined>(undefined);
  contactTypeOptions: DropdownOption[] = [{ label: 'All', value: 0 }, ...CONTACT_TYPES];
  contacts = signal<Contact[]>([]);

  filteredContacts = computed(() => {
    const selected = this.contactTypeSelected();
    if (!selected || selected.value === 0) {
      return this.contactsService.contacts(); // all
    }
    return this.contactsService.contacts().filter((c) => c.contactType === selected.value);
  });

  onSelectionChange(option: DropdownOption) {
    this.contactTypeSelected.set(option);
  }
}
