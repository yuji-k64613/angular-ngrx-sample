import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
 
import { selectBookCollection, selectBooks, selectBooksCounter } from './state/books.selectors';
import {
  retrievedBookList,
  addBook,
  removeBook,
  clearBookList,
} from './state/books.actions';
import { GoogleBooksService } from './book-list/books.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));
  counter$ = this.store.pipe(select(selectBooksCounter));

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }
 
  onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  onClear() {
    this.store.dispatch(clearBookList());
  }

  constructor(
    private booksService: GoogleBooksService,
    private store: Store
  ) {}
 
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));

    this.counter$.subscribe(n => this.show = n > 0);
  }
}
