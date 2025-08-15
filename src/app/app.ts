import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Datagrid } from './components/datagrid/datagrid';
import { NgbdModalDelete } from './components/modaldelete/modaldelete';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Datagrid, NgbdModalDelete],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('phonebook');
  projectName = 'Phone Book';
}
