import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Datagrid } from './components/datagrid/datagrid';
import { Add } from './components/add/add';
import { Filter } from './components/filter/filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Datagrid, Add, Filter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('phonebook');
  projectName = 'Phone Book';
}
