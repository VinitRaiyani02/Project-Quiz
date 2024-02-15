import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { InitInputField, InputFieldProps } from 'src/app/models/forms/InputFieldsProps';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() parentForm: FormGroup = new FormGroup('');
  @Input() props: InputFieldProps = InitInputField;
  control: FormControl = new FormControl('');
  @Input() index: number = 0;
  
  ngOnInit(): void {
    if(this.props.FormGroupName){
      this.control = this.parentForm.get(this.props.FormGroupName)?.get(this.props.ControlName) as FormControl;
    }
    else{
      this.control = this.parentForm.get(this.props.ControlName) as FormControl;
    }
  }
}
