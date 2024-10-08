import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() TotalCount: number = 0;
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  handlePageChange(event: PageEvent){
      this.page.emit(event);
  }
}
