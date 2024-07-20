import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() totalPages: number = 0;
  @Input() selectedPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number) {
    if (page !== this.selectedPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    if (this.selectedPage > 1) {
      this.changePage(this.selectedPage - 1);
    }
  }

  nextPage() {
    if (this.selectedPage < this.totalPages) {
      this.changePage(this.selectedPage + 1);
    }
  }

  getPageRange(): number[] {
    const pageRange = [];
    if (this.totalPages <= 3) {
      for (let i = 1; i <= this.totalPages; i++) {
        pageRange.push(i);
      }
    } else {
      // Ensure at least one page before and after the selected page
      let startPage = Math.max(1, this.selectedPage - 1);
      let endPage = Math.min(startPage + 2, this.totalPages);

      // Adjust if there are fewer pages after the selected page
      if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageRange.push(i);
      }
    }
    return pageRange;
  }

}
