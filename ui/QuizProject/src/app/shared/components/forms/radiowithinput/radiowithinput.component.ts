import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radiowithinput',
  templateUrl: './radiowithinput.component.html',
  styleUrls: ['./radiowithinput.component.css']
})
export class RadiowithinputComponent {

  @Input() questionType: string = "";
  @Input() options!: FormGroup[];;
  @Output() optionChange = new EventEmitter<number>();

  optionFormArray!: FormArray;

  constructor(private formBuilder: FormBuilder) { 
    this.optionFormArray = formBuilder.array([]);
  }

  ngOnInit(): void {
    this.optionFormArray = this.formBuilder.array(
      this.options.map(optionGroup => this.formBuilder.group({
        option: [optionGroup.get('option')?.value, Validators.required],
        isAnswer: false
      }))
    );
  }

  onRadioChange(index: number): void {
    this.optionFormArray.controls.forEach((control, i) => {
      if (i !== index) {
        control.get('isAnswer')?.setValue(false);
      }
    });
    this.optionFormArray.controls[index].get('isAnswer')?.setValue(true);
    this.optionChange.emit(index);
  }
}
