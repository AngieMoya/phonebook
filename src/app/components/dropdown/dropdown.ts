import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {

  @Input() title: string = 'Title';
  @Input() option1: string = 'option';
  @Input() option2: string = 'option';
  @Input() option3: string = 'option';
  
}
