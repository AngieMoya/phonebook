import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export interface DropdownOption {
  label: string;
  value: number;
}
@Component({
  selector: 'app-dropdown',
  standalone:true,
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {
  
  @Input() options:DropdownOption[] = [];
  @Input() selected?: DropdownOption;
  @Input() placeholder = 'Placeholder...';

  @Output() selectionChange = new EventEmitter<DropdownOption>();

  onSelect(option:DropdownOption){
    this.selected = option;
    this.selectionChange.emit(option);
  }

}
