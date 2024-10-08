import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radiowithinput',
  templateUrl: './radiowithinput.component.html',
  styleUrls: ['./radiowithinput.component.css']
})
export class RadiowithinputComponent {

  @Input() index: number = 0;
  @Input() options!: FormGroup[];
  @Output() optionChange = new EventEmitter<number>();
  control: FormControl = new FormControl('');

  getOptionControl(index: number): FormControl {
    return this.options[index].get('option') as FormControl;
  }
  // getIsAnsControl(index: number): FormControl {
  //   return this.options[index].get('isAns') as FormControl;
  // }
  // getFormgroup(index:number): FormGroup {
  //   return this.options[index] as FormGroup;
  // }

  // onRadioChange(index: number): void {
  //   this.optionChange.emit(index);
  // }
}
