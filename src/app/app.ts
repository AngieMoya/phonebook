import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Datagrid } from './components/datagrid/datagrid';
import { Add } from './components/add/add';
import { Dropdown, DropdownOption } from "./components/dropdown/dropdown";
import { CONTACT_TYPES } from './constants/contact-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Datagrid, Add, Dropdown],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('phonebook');

  contactTypeOptions: DropdownOption[]=[{label: 'All', value: 0},...CONTACT_TYPES]

}
