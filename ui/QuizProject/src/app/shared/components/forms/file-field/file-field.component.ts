import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InitInputField, InputFieldProps } from 'src/app/models/forms/InputFieldsProps';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {

  @Input() parentForm: FormGroup = new FormGroup('');
  @Input() props: InputFieldProps = InitInputField;
  control: FormControl = new FormControl('');
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnInit(): void {
    this.control = this.parentForm.get(this.props.ControlName) as FormControl;
  }
  onFileSelected(event: Event){
    this.change.emit(event);
  }
}
