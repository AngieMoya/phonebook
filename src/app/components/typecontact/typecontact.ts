import { Component } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';

@Component({
  selector: 'app-typecontact',
  standalone: true,
  imports: [Dropdown],
  templateUrl: './typecontact.html',
  styleUrl: './typecontact.css'
})
export class Typecontact {
  title = 'Contact Type';

  type = {
    type1: '',
    type2: '',
    type3: ''
  }

}
