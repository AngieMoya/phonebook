import { Component } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';

@Component({
  selector: 'app-filter',
  standalone:true,
  imports: [Dropdown],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  title = 'Filter';

  filter = {
    option1: '',
    option2: '',
    option3: ''
  }

}
