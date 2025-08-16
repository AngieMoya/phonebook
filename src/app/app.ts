import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Datagrid } from './components/datagrid/datagrid';
import { Add } from './components/add/add';
import { Dropdown, DropdownOption } from './components/dropdown/dropdown';
import { CONTACT_TYPES, MAPPED_CONTACT_TYPES_AUX } from './constants/contact-types';
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
export class App implements OnInit {
  contactsService = inject(ContactsService);

  contactTypeSelected = signal<DropdownOption | undefined>(undefined);
  contactTypeOptions: DropdownOption[] = [{ label: 'All', value: 0 }, ...CONTACT_TYPES];
  contacts = signal<Contact[]>([]);

  filteredContacts = computed(() => {
    const selected = this.contactTypeSelected();
    if (!selected || selected.value === 0) {
      return this.contacts(); // all
    }
    return this.contacts().filter((c) => c.contactType === selected.value);
  });

  onSelectionChange(option: DropdownOption) {
    this.contactTypeSelected.set(option);
  }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts.set(data);
    });
  }
}
