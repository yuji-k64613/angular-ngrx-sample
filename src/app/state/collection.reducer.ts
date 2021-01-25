import { createReducer, on, Action } from '@ngrx/store';
import { addBook, clearBookList, removeBook } from './books.actions';
 
export const initialState: ReadonlyArray<string> = [];
 
export const collectionReducer = createReducer(
  initialState,
  on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
  on(addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;
 
    return [...state, bookId];
  }),
  on(clearBookList, (state) => initialState),
);
