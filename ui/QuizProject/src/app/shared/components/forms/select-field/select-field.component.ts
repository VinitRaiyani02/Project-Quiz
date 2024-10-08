import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitInputField, InputFieldProps } from 'src/app/models/forms/InputFieldsProps';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent implements OnInit {

  @Input() parentForm: FormGroup = new FormGroup('');
  @Input() props: InputFieldProps = InitInputField;
  control: FormControl = new FormControl('');

  ngOnInit(): void {
    if(this.props.FormGroupName){
      this.control = this.parentForm.get(this.props.FormGroupName)?.get(this.props.ControlName) as FormControl;
    }
    else {
      this.control = this.parentForm.get(this.props.ControlName) as FormControl;
    }
  }
}
