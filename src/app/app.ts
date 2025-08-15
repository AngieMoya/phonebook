import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact, Datagrid } from './components/datagrid/datagrid';
import { Add } from './components/add/add';
import { Dropdown, DropdownOption } from "./components/dropdown/dropdown";
import { CONTACT_TYPES } from './constants/contact-types';
import { USERS } from './constants/mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Datagrid, Add, Dropdown],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('phonebook');
  contactTypeSelected = signal<DropdownOption | undefined>(undefined);
  contactTypeOptions: DropdownOption[]=[{label: 'All', value: 0},...CONTACT_TYPES]
  contacts = signal<Contact[]>(USERS);

  filteredContacts = computed(() => {
    console.log("computed")
    const selected = this.contactTypeSelected();
    if (!selected || selected.value === 0) {
      return this.contacts(); // all
    }
    return this.contacts().filter(c => c.contactType === selected.value);
  });

  onSelectionChange(option:DropdownOption){
    this.contactTypeSelected.set(option)
  }
}
